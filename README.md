# 你的姓名（YOUR NAME）

A modern, responsive personal website template for academics and professionals, built with Jekyll and Tailwind CSS. Supports English and Chinese languages.

一个现代化、响应式的个人学术网站模板，基于Jekyll和Tailwind CSS构建，支持英文和中文双语。

## Features
## 功能特点

- **Modern Design**: Clean, professional layout
- **Responsive**: Mobile-friendly
- **Multilingual**: English and Chinese support
- **Academic Sections**: Home, Blog, CV, News
- **Performance Optimized**: Fast loading
- **Easy Customization**: Simple configuration
- **Tailwind CSS**: Utility-first styling
- **Jekyll**: Static site generator

- **现代设计**：简洁专业的布局
- **响应式**：移动友好
- **多语言**：支持英文和中文
- **学术板块**：首页、博客、简历、新闻
- **性能优化**：快速加载
- **易于定制**：简单配置
- **Tailwind CSS**：实用优先的样式
- **Jekyll**：静态网站生成器

## Tech Stack
## 技术栈

- Jekyll 4.x
- Tailwind CSS 3.x
- JavaScript
- Ruby 3.0+
- Node.js 16.0+

## Quick Start
## 快速开始

### Prerequisites
### 前置要求

- Ruby 2.7.0+
- Node.js 16.0+
- Git

### Installation
### 安装

1. **Clone the repository**
   ```bash
   git clone https://github.com/wulu2026/wulu2026.github.io.git
   cd wulu2026.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   npm install
   ```

3. **Build CSS**
   ```bash
   npm run build:css
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser** at `http://localhost:4000`

## Customization
## 定制

### Configuration
### 配置

Edit `_config.yml` to update:
- Site title and description
- Author information
- Social media links
- Navigation menu

### Content Management
### 内容管理

Update content in `_data/` files:
- `highlights.yml` - Featured highlights
- `publications.yml` - Recent publications
- `education.yml` - Education history
- `employment.yml` - Employment history
- `skills.yml` - Skills information
- `news.yml` - News items

### Blog
Add new posts in `_posts/` directory with format `YYYY-MM-DD-title.md`.

### Styling
### 样式

- Edit `tailwind.config.js` for colors, fonts, etc.
- Add custom styles to `assets/css/style.css`
- Run `npm run build:css` after changes

### Internationalization
### 国际化

Edit translation files in `_data/i18n/`:
- `en.yml` - English translations
- `zh.yml` - Chinese translations

## Deployment
## 部署

### GitHub Pages
1. Push code to your repository
2. Configure GitHub Pages in repository settings:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/`
3. Access your site at `https://yourusername.github.io`

### Other Hosting
Deploy the generated `_site` directory to any static hosting provider:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## Performance
## 性能

- **CSS Optimization**: Tailwind CSS with JIT compilation
- **Font Optimization**: Preloaded and asynchronous loading

## License
## 许可证

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
## 致谢

- [Jekyll](https://jekyllrb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/)