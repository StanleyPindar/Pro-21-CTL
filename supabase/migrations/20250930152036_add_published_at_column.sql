/*
  # Add published_at column to articles table
  
  ## Changes
  Add the missing published_at timestamp column to track when articles are published.
  
  1. Add published_at column (timestamp with time zone)
  2. Set default to null (will be set when article is published)
*/

-- Add published_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'published_at'
  ) THEN
    ALTER TABLE articles ADD COLUMN published_at timestamptz DEFAULT NULL;
  END IF;
END $$;