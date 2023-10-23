import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'happy-ui',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/Button' }, // components会默认自动对应到src文件夹
      { title: 'github', link: 'https://github.com/liuxiqin677/happy-ui' },
    ],
  },
  styles: [
    `
    .dumi-default-header-left {
      width: 220px !important;
    }
    .dumi-default-hero-title {
      font-size: 120px !important;
    }
  `,
  ],
  logo: '/logo.svg',
  favicons: ['/logo.svg'],
});
// pnpm i jest @testing-library/react @types/jest ts-jest jest-environment-jsdom jest-less-loader typescript@4 -D

