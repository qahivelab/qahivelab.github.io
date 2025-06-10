# 📝 QA HiveLab Content Contribution Guide

Welcome to QA HiveLab! This guide explains how to contribute content without needing HTML knowledge. Everything is managed through simple Markdown files and data structures.

## 🚀 Quick Start for Authors

### 1. Writing a New Blog Post

1. **Copy the template**: Duplicate `_templates/blog-post-template.md`
2. **Rename**: Use format `YYYY-MM-DD-your-post-title.md`
3. **Place in**: `_posts/` directory
4. **Fill out**: The front matter (the section between `---`)
5. **Write**: Your content in Markdown below the front matter

**Example file name**: `2024-06-08-selenium-best-practices.md`

### 2. Adding Yourself as an Author

1. **Edit**: `_data/authors.yml`
2. **Add your info**: Copy the template at the bottom
3. **Use your author ID**: In your blog post front matter

## 📁 Content Structure

```
qahivelab/
├── _posts/                     # Blog posts go here
│   └── YYYY-MM-DD-title.md    # Your blog posts
├── _data/                     # Site configuration (data-driven)
│   ├── authors.yml           # Author information
│   └── site_config.yml       # Site settings
├── _templates/               # Templates for contributors
│   └── blog-post-template.md # Copy this for new posts
└── CONTENT_GUIDE.md         # This guide
```

## ✍️ Writing Guidelines

### Front Matter (Required Fields)

```yaml
---
title: "Your Compelling Title"           # ✅ Required
date: 2024-06-08                        # ✅ Required (YYYY-MM-DD)
author: your_author_id                   # ✅ Required (from authors.yml)
excerpt: "One sentence hook"             # ✅ Required
categories: [testing, automation]        # Choose appropriate categories
tags: [selenium, python, pytest]        # Specific tech/topic tags
---
```

### Content Categories
- `testing` - QA methodologies, best practices
- `automation` - Test automation tools and frameworks  
- `ai` - AI/ML in testing, intelligent testing
- `tools` - Tool reviews, comparisons, tutorials
- `community` - Community news, events, discussions
- `tutorials` - Step-by-step guides

### Markdown Tips

```markdown
# Main Title (H1) - Use once
## Section Title (H2) 
### Subsection (H3)

**Bold text** for emphasis
*Italic text* for subtle emphasis

- Bullet points
- For lists

1. Numbered lists
2. For steps

`inline code` for short code snippets

\```python
# Code blocks with syntax highlighting
def test_example():
    assert True
\```

[Link text](https://example.com)

![Image alt text](/assets/images/example.jpg)
```

## 🤝 Contribution Workflow

### Option 1: GitHub Web Interface (Easiest)
1. Go to GitHub repository
2. Navigate to `_posts/` or `_data/`
3. Click "Add file" → "Create new file"
4. Copy template content
5. Fill out your content
6. Scroll down and create Pull Request

### Option 2: Local Development
1. Clone the repository
2. Create your content files
3. Test locally with `bundle exec jekyll serve`
4. Commit and push your changes
5. Create Pull Request

### Option 3: Direct File Upload
1. Create your `.md` file locally
2. Go to GitHub repository
3. Navigate to appropriate folder
4. Drag and drop your file
5. Create Pull Request

## 🛠️ For Site Administrators

### Site Configuration
Edit `_data/site_config.yml` to modify:
- Site metadata and SEO
- Homepage content and CTAs
- Feature cards
- Blog settings
- Partnership information

### Author Management
Edit `_data/authors.yml` to:
- Add new authors
- Update author information
- Manage social links

### Content Moderation
1. Review Pull Requests for:
   - Content quality and relevance
   - Proper front matter
   - Appropriate categorization
2. Test changes locally if needed
3. Merge approved content

## 🎨 Advanced Features

### Featured Posts
Set `featured: true` in front matter to highlight posts

### Draft Posts
Set `published: false` to create drafts

### Custom Images
- Add images to `/assets/images/posts/`
- Reference in front matter: `image: /assets/images/posts/your-image.jpg`

### SEO Optimization
Include in front matter:
```yaml
description: "Detailed SEO description"
keywords: "relevant, keywords, for, search"
```

## 👥 QA HiveLab Team Authors

Our founding team includes eight QA Automation experts from Healthnexus:

- **juan_pablo_moreno** - Juan Pablo Moreno (AI & Prompting Expert)
- **carolina_cardona** - Carolina Cardona (Detail & Reporting Expert)  
- **laura_giraldo** - Laura Giraldo (Business Understanding Expert)
- **juan_luis_becquet** - Juan Luis Becquet (Problem Solving Expert)
- **juan_esteban_marin** - Juan Esteban Marin (API Testing Specialist)
- **juan_diego_vasquez** - Juan Diego Vasquez (Karate & Java Expert)
- **diego_bermudez** - Diego Alejandro Bermudez (CI/CD & Security Expert)
- **cesar_tapasco** - Cesar Augusto Tapasco (QA Leader & Mentor)

All founders specialize in **API testing**, **UI automation with Playwright and Behave**, and cutting-edge testing technologies.

## 🆘 Need Help?

1. **Template Issues**: Check `_templates/blog-post-template.md`
2. **Author Setup**: Review `_data/authors.yml` examples
3. **Markdown Help**: [Markdown Guide](https://www.markdownguide.org/)
4. **Technical Issues**: Create an issue in the repository
5. **Team Questions**: Reach out to any of our founding team members

## 📋 Content Checklist

Before submitting:
- [ ] Used blog post template
- [ ] Filled all required front matter fields
- [ ] Added yourself to authors.yml (first-time contributors)
- [ ] Content is original and relevant to QA community
- [ ] Proper markdown formatting
- [ ] Spell-checked and proofread
- [ ] Appropriate categories and tags

---

**Happy Writing! 🐝**

*The QA HiveLab community thrives on your contributions. Every post helps fellow QA engineers learn and grow.* 