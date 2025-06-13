# QA Hive Lab Blog

A modern, responsive Jekyll-based static blog for the QA Automation community. This blog serves as a hub for sharing knowledge about automation, artificial intelligence in testing, and quality assurance best practices.

## 🌟 Features

- **Modern Design**: Clean, minimalistic, and responsive design
- **Jekyll-Powered**: Built with Jekyll for easy content management
- **SEO Optimized**: Built-in SEO tags and optimization
- **Responsive**: Mobile-first design that works on all devices
- **Fast Loading**: Optimized for performance
- **Syntax Highlighting**: Code blocks with syntax highlighting
- **Tag System**: Organize posts with tags
- **Pagination**: Automatic pagination for blog posts
- **Team Profiles**: Dedicated pages for community members
- **Resources Section**: Curated collection of QA tools and resources
- **RSS Feed**: Automatic RSS feed generation
- **Social Sharing**: Built-in social media sharing

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/qahivelab/qahivelab.github.io.git
   cd qahivelab.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000` to see the blog

### Development with Live Reload

For development with automatic reloading:

```bash
bundle exec jekyll serve --livereload
```

## 📁 Project Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/                 # Page layouts
│   ├── default.html         # Base layout
│   ├── home.html            # Homepage layout
│   ├── post.html            # Blog post layout
│   └── page.html            # Static page layout
├── _includes/                # Reusable components
│   ├── head.html            # HTML head section
│   ├── header.html          # Site header
│   ├── footer.html          # Site footer
│   ├── icon-github.html     # GitHub icon
│   └── icon-twitter.html    # Twitter icon
├── _posts/                   # Blog posts
├── _team/                    # Team member profiles
├── _sass/                    # Sass stylesheets
├── assets/                   # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── pages/                    # Static pages
│   ├── about.md
│   ├── join.md
│   ├── blog.html
│   ├── team.html
│   └── resources.html
├── Gemfile                   # Ruby dependencies
└── README.md                 # This file
```

## ✍️ Writing Content

### Creating Blog Posts

1. Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`
2. Add the front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15 09:00:00 -0000
author: "Author Name"
tags: [tag1, tag2, tag3]
excerpt: "Brief description of your post"
---
```

3. Write your content in Markdown below the front matter

### Adding Team Members

1. Create a new file in `_team/` with the format: `firstname-lastname.md`
2. Add the front matter:

```yaml
---
layout: page
name: "Full Name"
role: "Job Title"
specialties: ["Skill 1", "Skill 2", "Skill 3"]
github: "github-username"
linkedin: "linkedin-username"
twitter: "twitter-username"
website: "https://website.com"
order: 1
---
```

3. Write the team member's bio and details in Markdown

### Updating Resources

Edit `resources.html` to add new tools, tutorials, or resources to the community collection.

## 🎨 Customization

### Colors and Theming

The site uses CSS custom properties (variables) for easy theming. Edit `assets/css/style.scss` to customize:

```scss
:root {
  --primary-color: #2563eb;
  --secondary-color: #06b6d4;
  --accent-color: #8b5cf6;
  // ... other variables
}
```

### Navigation

Update the navigation menu in `_config.yml`:

```yaml
navigation:
  - title: "Home"
    url: "/"
  - title: "Blog"
    url: "/blog/"
  # Add more navigation items
```

### Social Links

Configure social media links in `_config.yml`:

```yaml
social:
  github: "qahivelab"
  linkedin: "company/qahivelab"
  twitter: "qahivelab"
  # Add more social platforms
```

## 🚀 Deployment

### GitHub Pages

1. Push your changes to the `main` branch
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://yourusername.github.io`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy automatically on push

### Custom Domain

1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update `url` in `_config.yml`

## 🔧 Configuration

### SEO Settings

Update SEO settings in `_config.yml`:

```yaml
title: "Your Blog Title"
description: "Your blog description"
url: "https://yourdomain.com"
author: "Your Name"
twitter:
  username: yourusername
  card: summary_large_image
```

### Analytics

Add Google Analytics tracking ID in `_config.yml`:

```yaml
google_analytics: "G-XXXXXXXXXX"
```

### Comments

To add comments, integrate with services like:
- Disqus
- Utterances
- Giscus

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Content Contributions

1. **Blog Posts**: Share your QA knowledge and experiences
2. **Resources**: Suggest new tools, tutorials, or resources
3. **Team Profiles**: Add your profile to join our community showcase

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test locally: `bundle exec jekyll serve`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/qahivelab/qahivelab.github.io/issues) with:

- Clear description of the issue
- Steps to reproduce (if applicable)
- Expected vs actual behavior
- Screenshots (if helpful)

## 📝 Content Guidelines

### Writing Style

- **Clear and Concise**: Write in a clear, accessible style
- **Practical Focus**: Include real-world examples and code samples
- **Beginner Friendly**: Explain technical concepts clearly
- **Community Oriented**: Encourage discussion and collaboration

### Code Examples

- Use proper syntax highlighting
- Include complete, runnable examples
- Add comments to explain complex logic
- Follow best practices and conventions

### Images and Media

- Optimize images for web (use WebP when possible)
- Include alt text for accessibility
- Keep file sizes reasonable
- Use consistent styling and formatting

## 🛠️ Development

### Local Development Setup

1. **Install Ruby and Bundler**
   ```bash
   # On macOS with Homebrew
   brew install ruby
   gem install bundler
   
   # On Ubuntu/Debian
   sudo apt-get install ruby-full build-essential zlib1g-dev
   gem install bundler
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/qahivelab/qahivelab.github.io.git
   cd qahivelab.github.io
   bundle install
   ```

3. **Development Commands**
   ```bash
   # Serve with live reload
   bundle exec jekyll serve --livereload
   
   # Build for production
   bundle exec jekyll build
   
   # Clean build files
   bundle exec jekyll clean
   ```

### Testing

Run tests to ensure everything works correctly:

```bash
# Check for broken links
bundle exec htmlproofer ./_site --disable-external

# Validate HTML
bundle exec jekyll build && bundle exec htmlproofer ./_site
```

## 📚 Resources

### Jekyll Documentation
- [Jekyll Official Docs](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Jekyll Themes](https://jekyllrb.com/docs/themes/)

### Markdown Guide
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)

### Design Resources
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jekyll Team** - For the amazing static site generator
- **GitHub Pages** - For free hosting
- **QA Community** - For inspiration and content ideas
- **Contributors** - Everyone who helps make this project better

## 📞 Site
- **GitHub**: [@qahivelab](https://github.com/qahivelab)

---

**Happy Testing! 🧪✨**

Built with ❤️ by the QA Hive Lab community 