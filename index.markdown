---
layout: default
title: 首页
---

<div class="text-center py-16">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">欢迎来到我的网站</h1>
  <p class="text-lg text-gray-600 mb-8">这是一个基于 Jekyll 和 Tailwind CSS 构建的网站</p>
  <a href="{{ "/about" | relative_url }}" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
    了解更多
  </a>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-3">功能一</h2>
    <p class="text-gray-600">这里是功能一的描述，展示网站的核心功能。</p>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-3">功能二</h2>
    <p class="text-gray-600">这里是功能二的描述，展示网站的核心功能。</p>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-3">功能三</h2>
    <p class="text-gray-600">这里是功能三的描述，展示网站的核心功能。</p>
  </div>
</div>
