/*
  # Fix SQL Injection Risk - Secure Article View Count Increment

  ## Summary
  This migration creates a secure PostgreSQL function for incrementing article view counts,
  eliminating SQL injection risks and ensuring atomic operations.

  ## Changes
  1. **New Function: `increment_article_view_count`**
     - Safely increments view_count by 1 for a given article ID
     - Uses parameterized query to prevent SQL injection
     - Atomic operation to prevent race conditions
     - Returns the updated view count
     - Proper error handling with validation

  2. **Security Features**
     - Input validation (UUID format check)
     - SECURITY DEFINER for controlled execution
     - No dynamic SQL construction
     - Proper permissions and access control

  3. **Performance**
     - Single atomic database operation
     - No round-trip overhead
     - Indexed lookup on primary key (id)

  ## Usage
  Call from application code using Supabase RPC:
  ```typescript
  await supabase.rpc('increment_article_view_count', { article_id: 'uuid-here' })
  ```

  ## Security Notes
  - Prevents SQL injection attacks
  - Validates UUID format at database level
  - Only increments published articles
  - Rate limiting should be implemented at application level
*/

-- Create the secure increment function
CREATE OR REPLACE FUNCTION increment_article_view_count(article_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  -- Validate input: check if article_id is provided
  IF article_id IS NULL THEN
    RAISE EXCEPTION 'article_id cannot be null';
  END IF;

  -- Atomically increment view_count and return the new value
  -- Only increment if the article exists and is published
  UPDATE articles
  SET 
    view_count = COALESCE(view_count, 0) + 1,
    updated_at = now()
  WHERE 
    id = article_id 
    AND published = true
  RETURNING view_count INTO new_count;

  -- Check if the article was found and updated
  IF new_count IS NULL THEN
    -- Article doesn't exist or is not published
    RAISE EXCEPTION 'Article not found or not published: %', article_id;
  END IF;

  RETURN new_count;
END;
$$;

-- Grant execute permission to authenticated and anon users (for public article viewing)
GRANT EXECUTE ON FUNCTION increment_article_view_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_article_view_count(uuid) TO anon;

-- Add helpful comment
COMMENT ON FUNCTION increment_article_view_count(uuid) IS 'Securely increments the view count for a published article. Prevents SQL injection and ensures atomic updates.';

-- Ensure view_count column has proper constraints (idempotent)
DO $$
BEGIN
  -- Add NOT NULL constraint with default if it doesn't exist
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' 
    AND column_name = 'view_count' 
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE articles 
    ALTER COLUMN view_count SET DEFAULT 0,
    ALTER COLUMN view_count SET NOT NULL;
  END IF;
END $$;

-- Create index on view_count for analytics queries (if not exists)
CREATE INDEX IF NOT EXISTS idx_articles_view_count ON articles(view_count DESC) WHERE published = true;