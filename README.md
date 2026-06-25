# 777stay 技术博客

站点：https://777stay.github.io/

## 写新文章

推荐用脚本创建文章模板：

```bash
npm run new-post -- "Redis 缓存击穿排查复盘"
```

脚本会在 `src/content/blog/` 下生成 Markdown 文件，默认包含：

- 背景
- 问题
- 方案
- 实现
- 验证
- 复盘

写完后本地验证：

```bash
npm run build
```

提交并发布：

```bash
git add .
git commit -m "Add post: Redis cache breakdown"
git push
```

GitHub Actions 会自动部署到 GitHub Pages。

## 文章 frontmatter

每篇文章开头需要包含：

```md
---
title: "文章标题"
description: "一句话说明这篇文章解决了什么工程问题。"
pubDate: 2026-06-25
tags: ["后端", "系统设计"]
---
```

## 设计方向

当前实现借鉴了 GitHub 上流行博客项目的成熟模式：

- AstroPaper / Openblog：SEO、RSS、sitemap、可访问性、文章优先。
- Astro Ink：标签系统、轻量 Markdown 博客体验。
- Tailwind Nextjs Starter Blog：面向技术写作的文章流、阅读时间、清晰归档。
- Hugo PaperMod / Minimal Mistakes：快速、干净、响应式、长期维护的个人技术博客结构。

当前视觉参考：Vercel 的极简工程感 + Linear 的深色精密感。

核心原则：

- 技术内容优先，不做情绪化表达。
- 首页强调工程实践、AI 工具链、项目复盘。
- 文章尽量保留问题背景、方案取舍、踩坑记录和验证结果。
