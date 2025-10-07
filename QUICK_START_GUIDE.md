# Quick Start Guide - Enhanced Article System

## For Content Editors

### Creating a New Article

1. **Navigate to Admin Panel**
   - Go to `/admin` and log in
   - Click "New Article" button

2. **Fill in Basic Info**
   - Title: Your article title (auto-generates URL slug)
   - Slug: URL-friendly version (editable)
   - Excerpt: Brief summary for previews
   - Author: Your name
   - Category: Article type (Guide, Review, etc.)
   - Tags: Related keywords

3. **Write Content**
   - Use the markdown editor with live preview
   - Choose your preferred view mode:
     - **Edit**: Focus on writing
     - **Split**: See markdown and preview side-by-side
     - **Preview**: See final result

4. **Use the Toolbar**
   - **B** - Make text bold
   - **I** - Make text italic
   - **H** - Insert heading
   - **•** - Create list
   - **🔗** - Insert link
   - **📷** - Add image
   - **⊞** - Create table
   - **</>** - Add code block
   - **⚠** - Insert callout box

5. **Save or Publish**
   - "Save Draft" - Save without publishing
   - "Publish" - Make article live

---

## Markdown Cheat Sheet

### Text Formatting
```markdown
**bold text**
*italic text*
***bold and italic***
~~strikethrough~~
==highlighted text==
`inline code`
```

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

### Links & Images
```markdown
[Link text](https://example.com)
![Image alt text](https://example.com/image.jpg)
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |

Alignment:
| Left | Center | Right |
| :--- | :---: | ---: |
| Text | Text | Text |
```

### Code Blocks
````markdown
```javascript
function example() {
  return "Hello World";
}
```

```python
def example():
    return "Hello World"
```
````

### Callout Boxes
```markdown
> [!NOTE] Note Title
> This is an informational note.

> [!TIP] Pro Tip
> Helpful advice goes here.

> [!IMPORTANT] Important
> Critical information.

> [!WARNING] Warning
> Caution advised.

> [!CAUTION] Danger
> Serious warning.
```

### Blockquotes
```markdown
> This is a quote.
> It can span multiple lines.
```

### Horizontal Line
```markdown
---
```

---

## What Readers Will See

### Automatic Features
- ✅ Table of contents (auto-generated from headings)
- ✅ Reading progress bar
- ✅ Article metadata (author, date, reading time)
- ✅ Professional typography
- ✅ Responsive layout

### Navigation
- Click TOC items to jump to sections
- Current section highlighted in TOC
- Smooth scrolling
- Progress bar shows reading position

### Visual Elements
- Styled tables with borders
- Syntax-highlighted code blocks
- Colorful callout boxes
- Responsive images
- Professional spacing

---

## Tips for Great Articles

### Structure
1. Start with clear H1 title
2. Use H2 for main sections
3. Use H3 for subsections
4. Add TOC-friendly headings

### Content
- Write clear, concise sentences
- Use callouts for key information
- Add images to break up text
- Use tables for comparisons
- Include code examples when relevant

### Formatting
- Bold for emphasis
- Italic for definitions or terms
- Code formatting for technical terms
- Lists for easy scanning
- Callouts for tips and warnings

---

## Common Tasks

### Add a Featured Image
1. Find image URL (or upload to hosting)
2. Add URL in "Featured Image URL" field
3. Image appears as hero at top of article

### Create a Table
1. Click table button in toolbar
2. Edit the markdown:
```markdown
| Column 1 | Column 2 |
| --- | --- |
| Data 1 | Data 2 |
```
3. Preview updates automatically

### Add a Warning Box
1. Click callout button in toolbar
2. Change [!NOTE] to [!WARNING]
3. Edit title and content

### Insert Code
1. Click code block button
2. Add language after opening backticks:
````markdown
```javascript
your code here
```
````

---

## Troubleshooting

### Preview Not Updating?
- Switch to different view mode and back
- Check markdown syntax is correct

### Table Not Rendering?
- Ensure alignment row has `---`
- Check pipe `|` alignment
- Verify header row exists

### Code Block Not Showing?
- Use three backticks: ``` not `
- Ensure closing backticks on new line
- Check language name spelling

### Callout Not Working?
- Must start with `> [!TYPE]`
- Types: NOTE, TIP, IMPORTANT, WARNING, CAUTION
- Each line needs `>` prefix

---

## Keyboard Shortcuts

While in textarea:
- **Tab** - Insert indent
- **Shift+Tab** - Remove indent
- **Ctrl/Cmd+Z** - Undo
- **Ctrl/Cmd+Y** - Redo

---

## Support

### Need Help?
- Check FEATURES_DEMO.md for visual examples
- See TEST_ARTICLE.md for complete syntax reference
- Review IMPLEMENTATION_SUMMARY.md for technical details

### Best Practices
- Write in short paragraphs (3-5 sentences)
- Use headings every 300-500 words
- Add images every 2-3 sections
- Use callouts for important points
- Test on mobile before publishing

---

## Next Steps

1. ✅ Create your first article
2. ✅ Experiment with formatting
3. ✅ Use preview to check layout
4. ✅ Add images and tables
5. ✅ Publish when ready

**Your articles will look professional and be easy to read!** 🎉
