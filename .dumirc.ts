/*
 * @Author: liuxiqin
 * @Date: 2023-10-24 10:14:16
 * @LastEditTime: 2023-10-25 17:34:28
 * @LastEditors: liuxiqin
 * @Description:
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'happy-ui',
    nav: [
      { title: '介绍', link: '/docs/guide.md' },
      { title: '组件', link: '/components/Button' }
    ]
  },
  logo: '/logo.svg',
  favicons: ['/logo.svg'],
  styles: [
    `
    .dumi-default-header-content {
      max-width: 100% !important;
    }
    .dumi-default-doc-layout > main {
      max-width: 100% !important;
    }
    .dumi-default-sidebar {
      width: 300px !important;
    }
    .dumi-default-header-left {
      width: 300px !important;
    }
    .dumi-default-sidebar > dl > dd > a {
      font-size: 14px !important;
    }
    `,
  ],
});
