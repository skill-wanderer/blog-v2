# 🌟 The Skill-Wanderer Journey

> **Insights from My Tech Journey** - A modern tech blog documenting explorations through various technology domains, project builds, and navigating the ever-evolving landscape of software development. Migrated from WordPress to Astro for enhanced performance and developer experience.

![Blog Preview](https://blog.skill-wanderer.com)

## 🚀 About This Blog

Welcome to The Skill-Wanderer Journey! This is a personal tech blog where I share insights, experiences, and learnings from my adventures in technology. From home data centers and Kubernetes clusters to development workflows and infrastructure projects, this blog serves as both a documentation of my journey and a resource for fellow tech enthusiasts.

### 🎯 What You'll Find Here

- **Home Data Center** projects and setups
- **DevOps & Infrastructure** insights
- **Self-Hosting** adventures
- **Container Orchestration** experiences
- Real-world project builds and lessons learned

## 🔄 From WordPress to Astro: A Strategic Migration

The decision to migrate the Skill-Wanderer blog from WordPress to Astro was a strategic choice driven by the pursuit of superior performance, greater developer control, and better alignment with the platform's modern, streamlined technology stack. This move prioritizes a faster, more efficient user experience and a more manageable development workflow.

### Key Drivers for the Migration:

**Performance and SEO**: Astro is engineered for content-heavy websites, focusing on maximizing performance and search engine optimization. It achieves this by shipping minimal to no JavaScript by default, which results in significantly faster page load times—a critical factor for user retention and SEO rankings.

**Developer Control and Modern Stack**: Moving to Astro provides a more controllable and performant solution compared to WordPress. It integrates seamlessly into a modern development workflow that utilizes Git for version control, allowing for more robust and collaborative processes. This aligns with the overall technical strategy of using contemporary frameworks like Nuxt.js for the main hub and preparing for future scalability.

**Resource Efficiency**: The migration reflects the core development principle of resourcefulness and efficiency. By leveraging a framework optimized for content, the platform can deliver a high-quality blog experience without the overhead and complexity that can sometimes be associated with a full-scale CMS like WordPress.

## 🛠️ Tech Stack

This blog is built with modern web technologies for optimal performance and developer experience:

- **[Astro](https://astro.build/)** - Static site generator with zero JS by default
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[MDX](https://mdxjs.com/)** - Markdown with embedded components
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

## 📁 Project Structure

```text
/
├── public/                     # Static assets
│   ├── favicon.svg
│   └── images/                 # Blog images and media
│       ├── authors/
│       ├── blog/
│       └── general/
├── src/
│   ├── components/             # Reusable Astro components
│   │   ├── AuthorBio.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ...
│   ├── constants/              # Type-safe constants
│   │   └── categories.ts
│   ├── content/               # Content collections
│   │   ├── config.ts          # Content schema definitions
│   │   └── posts/             # Blog posts in MDX format
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   └── pages/                 # File-based routing
│       ├── index.astro        # Homepage
│       └── blog/              # Blog routes
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` to see the blog in action!

## 🧞 Available Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ✍️ Writing Blog Posts

### Creating a New Post

1. Create a new `.mdx` file in `src/content/posts/`
2. Add the required frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post"
author:
  name: "Your Name"
  bio: "Your bio"
  avatar: "/images/authors/your-avatar.jpg"
publishDate: "2025-06-02"
category: "Home Data Center"  # Must match categories in constants/categories.ts
readTime: "5 min read"
image: "/images/blog/your-post/hero.jpg"
tags: ["tag1", "tag2", "tag3"]
---
```

3. Write your content using MDX (Markdown + JSX components)

### Adding New Categories

To add new blog categories:

1. Update `src/constants/categories.ts`
2. Add your new category to the `BLOG_CATEGORIES` array
3. The category will automatically appear in the blog navigation

## 🎨 Customization

### Design System

The blog uses a custom color palette defined in `tailwind.config.mjs`:

- **Dark Mode Colors**: Primary backgrounds and text colors optimized for readability
- **Light Mode Colors**: Clean, modern light theme elements
- **Brand Colors**: Skill-Wanderer orange accents (`#ff6b35`)

### Key Design Principles

- **Mobile-first responsive design**
- **High contrast for accessibility**
- **Clean typography optimized for reading**
- **Fast loading with optimized images**

## 🚀 CI/CD

This repository includes automated GitHub Actions workflows for continuous integration and deployment:

### Workflows

- **CI** (`ci.yml`): Runs on every push and PR
  - Builds the Astro application
  - Tests Docker build process
  - Uploads build artifacts
  
- **Multi-Architecture Build** (`build-and-push.yml`): Builds and pushes Docker images
  - Supports both **x86_64** and **ARM64** architectures
  - Pushes to GitHub Container Registry (ghcr.io)
  - Automatically triggered on pushes to main/master
  - Creates multi-platform images for diverse deployment environments
  
- **Dependency Updates** (`dependency-update.yml`): Weekly automated dependency maintenance
  - Updates npm dependencies
  - Creates PRs with security fixes
  - Validates builds after updates

### Container Registry

Multi-architecture Docker images are available at:
```
ghcr.io/skill-wanderer/blog-v2:latest
```

Pull the image:
```bash
docker pull ghcr.io/skill-wanderer/blog-v2:latest
```

## 🌐 Deployment

This blog is configured for deployment to various platforms:

- **Netlify**: Connect your repository and deploy automatically
- **Vercel**: Zero-config deployment with Git integration
- **GitHub Pages**: Static site hosting with GitHub Actions
- **Docker**: Containerized deployment for any environment
- **Self-hosted**: Build and serve the `dist/` folder

### Build for Production

```bash
npm run build
```

The built site will be in the `./dist/` directory, ready for deployment.

### 🐳 Docker Deployment

#### Using Pre-built Multi-Architecture Images

Pull and run the official multi-architecture image:

```bash
# Pull the latest image (supports both x86_64 and ARM64)
docker pull ghcr.io/skill-wanderer/blog-v2:latest

# Run the container
docker run -p 8080:80 ghcr.io/skill-wanderer/blog-v2:latest
```

#### Building Locally

Build and run the blog using Docker:

```bash
# Build the Docker image
docker build -t blog-v2 .

# Run the container
docker run -p 8080:80 blog-v2
```

The blog will be available at `http://localhost:8080`.

#### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  blog:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

#### Docker Features

- **Multi-architecture support**: Automated builds for x86_64 and ARM64 architectures
- **Multi-stage build**: Optimized for production with minimal image size
- **Nginx serving**: Fast static file serving with nginx
- **Production ready**: Suitable for deployment in any container orchestration platform
- **Self-contained**: All dependencies included in the image
- **GitHub Container Registry**: Automated image publishing with proper tagging

## 📝 Content Management

### Images

- Place blog images in `public/images/blog/[post-slug]/`
- Author avatars go in `public/images/authors/`
- Use the Astro Image component for optimized loading

### SEO

Each post includes:
- Meta descriptions
- Open Graph tags
- Structured data for search engines
- Optimized images with alt text

## 🤝 Contributing

This is a personal blog, but if you find bugs or have suggestions:

1. Open an issue describing the problem or enhancement
2. Fork the repository and make your changes
3. Submit a pull request with a clear description

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Blog**: [blog.skill-wanderer.com](https://blog.skill-wanderer.com)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

*Built with ❤️ using Astro and a passion for sharing knowledge*
