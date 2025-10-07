# Admin Backend Setup Guide

Your admin backend for managing articles has been successfully created! Here's how to use it:

## What's Been Built

1. **Database Schema** - Articles and admin users tables with Row Level Security
2. **Authentication System** - Secure login system using Supabase Auth
3. **Admin Dashboard** - Full-featured article management interface
4. **Article Editor** - Rich editor with markdown import functionality
5. **Protected Routes** - Secure admin-only access

## Getting Started

### Step 1: Apply Database Migration

The database tables need to be created. Run:

```bash
# This will create the articles and admin_users tables
```

The migration file is located at: `supabase/migrations/20250930000000_admin_articles.sql`

### Step 2: Create Your First Admin User

After the migration is applied, you need to create an admin account:

1. Sign up for an account through Supabase Auth (or use the Supabase dashboard)
2. Get your user ID from the Supabase dashboard (Authentication > Users)
3. Insert yourself into the admin_users table:

```sql
INSERT INTO admin_users (id, email, role)
VALUES ('your-user-id-here', 'your-email@example.com', 'admin');
```

### Step 3: Access the Admin Panel

Navigate to: `http://localhost:5173/admin/login`

Login with your credentials to access the admin dashboard.

## Admin Features

### Dashboard (`/admin/dashboard`)
- View all articles (published and drafts)
- Filter articles by status
- Quick actions: edit, delete, preview
- See article metadata at a glance

### Article Editor (`/admin/articles/new` or `/admin/articles/edit/:id`)
- **Title & Slug** - Auto-generates SEO-friendly slugs
- **Content** - Full markdown editor
- **Excerpt** - Article preview text
- **Metadata** - Author, category, tags
- **Featured Image** - Image URL support with preview
- **Import Markdown** - Upload .md files to import content
- **Save Draft** - Save without publishing
- **Publish** - Make article live on your site

## Importing Articles

Two ways to add content:

### 1. Manual Entry
- Click "New Article" in dashboard
- Fill in all fields
- Write/paste markdown content
- Click "Publish" or "Save Draft"

### 2. Import Markdown Files
- Click "New Article"
- Fill in title and metadata
- Click "Import Markdown" button
- Select your .md file
- Content will be imported automatically
- Review and publish

## Article Display

Published articles will be available at:
- `/articles` - List of all published articles
- `/articles/[slug]` - Individual article pages

The frontend already has the `ArticleDetailPage` component that will automatically fetch and display articles from the database.

## Security Features

All admin routes are protected with:
- Authentication required
- Admin role verification
- Row Level Security policies
- Session persistence

## Tips

1. **Slugs** - Auto-generated from titles, but you can customize them
2. **Tags** - Press Enter or click "Add" to add tags
3. **Drafts** - Save work in progress without publishing
4. **Preview** - Use the preview button to see how articles look live
5. **Markdown** - Supports full markdown syntax in content

## Troubleshooting

### Can't login?
- Verify your user exists in the admin_users table
- Check that email/password are correct
- Check browser console for errors

### Articles not showing?
- Verify RLS policies are in place
- Check that articles are marked as published
- View articles table in Supabase dashboard

### Need to add more admins?
Insert them into the admin_users table with their Supabase Auth user ID.

## Next Steps

1. Apply the database migration
2. Create your admin user
3. Login to `/admin/login`
4. Start creating articles!

---

For any issues, check the browser console and Supabase logs for detailed error messages.