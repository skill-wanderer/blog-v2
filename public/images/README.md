# Images Directory Structure

This directory contains all images used in the blog.

## Directory Structure

```
images/
├── blog/                    # Blog post images
│   ├── [post-slug]/        # Images specific to a blog post
│   └── shared/             # Shared blog images (icons, etc.)
├── authors/                # Author avatars and profile images
└── general/                # General site images (logos, backgrounds, etc.)
```

## Naming Conventions

### Blog Post Images
- **Hero images**: `hero.jpg` or `hero.png`
- **Feature images**: `feature-[description].jpg`
- **Inline images**: `[descriptive-name].jpg`
- **Thumbnails**: `thumb-[image-name].jpg`

### Author Images
- **Avatars**: `[author-slug]-avatar.jpg`
- **Profile photos**: `[author-slug]-profile.jpg`

### General Images
- **Logos**: `logo-[variant].svg`
- **Icons**: `icon-[name].svg`
- **Backgrounds**: `bg-[description].jpg`

## Image Guidelines

### Formats
- **Photos**: Use JPEG (.jpg) for photographs
- **Graphics/Icons**: Use SVG (.svg) for scalable graphics
- **Screenshots**: Use PNG (.png) for screenshots with text

### Sizes
- **Hero images**: 1200x630px (ideal for social sharing)
- **Feature images**: 800x400px
- **Thumbnails**: 300x150px
- **Author avatars**: 200x200px (square)

### Optimization
- Compress images before uploading
- Use descriptive alt text in your markdown
- Consider using WebP format for better compression

## Usage in Blog Posts

### In Markdown Frontmatter
```yaml
---
image: "/images/blog/post-slug/hero.jpg"
---
```

### In Markdown Content
```markdown
![Alt text](/images/blog/post-slug/feature-image.jpg)
```

### Author Avatars
```yaml
---
author:
  avatar: "/images/authors/skill-wanderer-avatar.jpg"
---
```
