/*
  # Add published_at consistency constraint

  ## Changes
  Add a check constraint to ensure published_at is only set when published is true.
  This maintains data integrity at the database level.

  1. Add constraint to ensure published_at is NULL when published is false
  2. Add constraint to ensure published_at is NOT NULL when published is true

  ## Important Notes
  - This prevents data inconsistencies
  - Ensures published_at always reflects actual publication status
  - Helps maintain chronological integrity of article history
*/

-- Add constraint to ensure published_at consistency
DO $$
BEGIN
  -- Drop constraint if it exists (for re-running migrations)
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'articles_published_at_consistency'
  ) THEN
    ALTER TABLE articles DROP CONSTRAINT articles_published_at_consistency;
  END IF;

  -- Add the constraint
  -- When published = false, published_at must be NULL
  -- When published = true, published_at must be NOT NULL
  ALTER TABLE articles
    ADD CONSTRAINT articles_published_at_consistency
    CHECK (
      (published = false AND published_at IS NULL) OR
      (published = true AND published_at IS NOT NULL)
    );
END $$;
