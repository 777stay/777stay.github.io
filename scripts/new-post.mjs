#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raw = process.argv.slice(2).join(' ').trim();
if (!raw) {
  console.error('Usage: npm run new-post -- "文章标题或 slug"');
  process.exit(1);
}

const slug = raw
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'untitled';

const today = new Date().toISOString().slice(0, 10);
const dir = join(process.cwd(), 'src', 'content', 'blog');
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`Post already exists: ${file}`);
  process.exit(1);
}

const title = raw.replace(/\.mdx?$/i, '');
const content = `---
title: "${title.replace(/"/g, '\\"')}"
description: "一句话说明这篇文章解决了什么工程问题。"
pubDate: ${today}
tags: ["技术积累"]
---

## 背景

这篇文章来自什么项目、问题或学习场景？

## 问题

具体遇到了什么问题？约束条件是什么？

## 方案

为什么选择这个方案？有没有其他备选？

## 实现

关键代码、配置或流程是什么？

## 验证

如何确认它真的有效？记录命令、测试结果或观察指标。

## 复盘

这次经验下次如何复用？

- 可复用点：
- 踩坑提醒：
- 后续改进：
`;

writeFileSync(file, content, 'utf8');
console.log(file);
