# 🌟 The Skill-Wanderer Journey

> **Insights from My Tech Journey** - A modern tech blog documenting explorations through various technology domains, project builds, and navigating the ever-evolving landscape of software development. Migrated from WordPress to Astro for enhanced performance and developer experience.


## 📚 Table of Contents

- [🚀 About This Blog](#-about-this-blog)
- [🔄 Migration Story](#-from-wordpress-to-astro-a-strategic-migration)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🧞 Available Commands](#-available-commands)
- [✍️ Writing Blog Posts](#️-writing-blog-posts)
- [🎨 Customization](#-customization)
- [🚀 CI/CD](#-cicd)
- [🌐 Deployment](#-deployment)
- [📝 Content Management](#-content-management)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🔗 Links](#-links)

## 🚀 About This Blog

Welcome to [**The Skill-Wanderer Journey**](https://wanderings.skill-wanderer.com)! This is a personal tech blog where I share insights, experiences, and learnings from my adventures in technology. From home data centers and Kubernetes clusters to development workflows and infrastructure projects, this blog serves as both a documentation of my journey and a resource for fellow tech enthusiasts.



## 🔄 From WordPress to Astro: A Strategic Migration

The decision to migrate the Skill-Wanderer blog from WordPress to Astro was a strategic choice driven by the pursuit of superior performance, greater developer control, and better alignment with the platform's modern, streamlined technology stack. This move prioritizes a faster, more efficient user experience and a more manageable development workflow.

### Key Drivers for the Migration:

**Performance and SEO**: Astro is engineered for content-heavy websites, focusing on maximizing performance and search engine optimization. It achieves this by shipping minimal to no JavaScript by default, which results in significantly faster page load times—a critical factor for user retention and SEO rankings.

**Developer Control and Modern Stack**: Moving to Astro provides a more controllable and performant solution compared to WordPress. It integrates seamlessly into a modern development workflow that utilizes Git for version control, allowing for more robust and collaborative processes. This aligns with the overall technical strategy of using contemporary frameworks like Nuxt.js for the main hub and preparing for future scalability.

**Resource Efficiency**: The migration reflects the core development principle of resourcefulness and efficiency. By leveraging a framework optimized for content, the platform can deliver a high-quality blog experience without the overhead and complexity that can sometimes be associated with a full-scale CMS like WordPress.

## 🛠️ Tech Stack

This blog is built with modern web technologies for optimal performance and developer experience:

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **[Astro](https://astro.build/)** | Static site generator | Zero JS by default, excellent performance |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript | Better developer experience and code reliability |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework | Rapid styling with consistent design system |
| **[MDX](https://mdxjs.com/)** | Markdown with embedded components | Rich content with interactive elements |
| **[Sharp](https://sharp.pixelplumbing.com/)** | High-performance image processing | Optimized images for faster loading |

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

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- **Git** for version control - [Download here](https://git-scm.com/)

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/skill-wanderer/blog-v2.git
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
   
   Navigate to `http://localhost:4321` to see the blog in action! 🎉

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

### 📝 Creating a New Post

1. **Create a new `.mdx` file** in `src/content/posts/`
   ```bash
   # File name format: your-post-title.mdx
   touch src/content/posts/my-awesome-post.mdx
   ```

2. **Add the required frontmatter:**

   ```yaml
   ---
   title: "My Awesome Tech Journey"
   description: "A brief, engaging description of your post (150-160 characters for SEO)"
   author:
     name: "Your Name"
     bio: "Your professional bio"
     avatar: "/images/authors/your-avatar.jpg"
   publishDate: "2025-06-02"
   category: "Home Data Center"  # Must match categories in constants/categories.ts
   readTime: "5 min read"
   image: "/images/blog/my-awesome-post/hero.jpg"
   tags: ["kubernetes", "self-hosting", "tutorial"]
   ---
   ```

3. **Write your content** using MDX (Markdown + JSX components)

   ```mdx
   ## Introduction
   
   Welcome to my post! Here's some **bold text** and *italic text*.
   
   ### Code Examples
   
   ```bash
   # This is a code block
   kubectl get pods
   ```
   


### 🏷️ Adding New Categories

To add new blog categories:

1. **Update** `src/constants/categories.ts`
2. **Add your category** to the `BLOG_CATEGORIES` array:
   ```typescript
   export const BLOG_CATEGORIES = [
     'Home Data Center',
     'DevOps',
     'Your New Category',  // Add here
     // ... other categories
   ];
   ```
3. The category will automatically appear in the blog navigation

### 📸 Adding Images

- **Hero images**: Place in `public/images/blog/[post-slug]/hero.jpg`
- **Content images**: Place in `public/images/blog/[post-slug]/[image-name].jpg`
- **Author avatars**: Place in `public/images/authors/[author-slug]-avatar.jpg`

See the [Images README](public/images/README.md) for detailed guidelines.

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

This blog supports multiple deployment strategies to fit different needs:

### 🎯 Deployment Options

| Platform | Difficulty | Best For | Setup Time |
|----------|------------|----------|------------|
| **Netlify** | Easy | Quick deployments | 5 minutes |
| **Vercel** | Easy | Next.js-like experience | 5 minutes |
| **GitHub Pages** | Medium | Free hosting | 10 minutes |
| **Docker** | Medium | Containerized environments | 15 minutes |
| **Kubernetes** | Advanced | Production clusters | 30 minutes |
| **Self-hosted** | Advanced | Full control | Variable |

### 🏗️ Build for Production

```bash
# Build the static site
npm run build

# Preview the build locally
npm run preview
```

The built site will be in the `./dist/` directory, ready for deployment.

### 🐳 Docker Deployment

#### Option 1: Using Pre-built Multi-Architecture Images (Recommended)

Pull and run the official multi-architecture image:

```bash
# Pull the latest image (supports both x86_64 and ARM64)
docker pull ghcr.io/skill-wanderer/blog-v2:latest

# Run the container
docker run -d \
  --name skill-wanderer-blog \
  -p 8080:80 \
  --restart unless-stopped \
  ghcr.io/skill-wanderer/blog-v2:latest

# Access the blog at http://localhost:8080
```

#### Option 2: Building Locally

Build and run the blog using Docker:

```bash
# Build the Docker image
docker build -t blog-v2 .

# Run the container
docker run -d \
  --name skill-wanderer-blog \
  -p 8080:80 \
  --restart unless-stopped \
  blog-v2
```

#### Option 3: Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  blog:
    image: ghcr.io/skill-wanderer/blog-v2:latest
    # Or build locally: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    container_name: skill-wanderer-blog
```

Then run:

```bash
docker-compose up -d
```

#### 🔧 Docker Features

- ✅ **Multi-architecture support**: Automated builds for x86_64 and ARM64
- ✅ **Multi-stage build**: Optimized for production with minimal image size  
- ✅ **Nginx serving**: Fast static file serving with nginx
- ✅ **Production ready**: Suitable for any container orchestration platform
- ✅ **Self-contained**: All dependencies included in the image
- ✅ **Auto-publishing**: GitHub Container Registry with proper tagging

### 🚢 Kubernetes Deployment

Deploy the blog on any Kubernetes cluster using the provided manifests:

```bash
# Quick deployment (uses default configuration)
kubectl apply -f k8s/

# Or using kustomize for customization
kubectl apply -k k8s/
```

#### 🎛️ Kubernetes Features

- ✅ **Ready-to-use manifests**: Deployment, Service, and Ingress configurations
- ✅ **Health checks**: Liveness and readiness probes included
- ✅ **Resource optimization**: Efficient CPU and memory usage
- ✅ **Highly customizable**: Easy configuration for different environments
- ✅ **Multi-architecture support**: Works with both x86_64 and ARM64 clusters
- ✅ **Production ready**: Includes best practices for production deployment

#### 🔧 Quick Customization

```bash
# Scale replicas
kubectl scale deployment blog-v2-deployment --replicas=3

# Update image version
kubectl set image deployment/blog-v2-deployment blog-v2=ghcr.io/skill-wanderer/blog-v2:v1.0.0

# Check deployment status
kubectl rollout status deployment/blog-v2-deployment
```

📖 **For detailed Kubernetes deployment instructions, see [`k8s/README.md`](k8s/README.md).**

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

### 📚 Documentation & Resources

- **[Astro Documentation](https://docs.astro.build)** - Complete Astro framework guide
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[MDX Documentation](https://mdxjs.com)** - Markdown for the component era
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language guide

### 🛠️ Development Tools

- **[GitHub Repository](https://github.com/skill-wanderer/blog-v2)** - Source code and issues
- **[GitHub Container Registry](https://github.com/skill-wanderer/blog-v2/pkgs/container/blog-v2)** - Docker images
- **[Kubernetes Deployment Guide](k8s/README.md)** - Detailed K8s setup instructions

### 🎯 Related Projects

- **Main Hub**: [Skill-Wanderer Platform](https://skill-wanderer.com) 
- **Learning Platform**: [Moodle LMS](https://dojo.skill-wanderer.com) (coming soon)

---

*Built with ❤️ using Astro and a passion for sharing knowledge*
