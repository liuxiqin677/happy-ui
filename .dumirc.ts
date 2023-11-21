import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'happy-ui',
    nav: [
      { title: '介绍', link: '/docs/guide.md' },
      { title: '组件', link: '/components/Button' },
    ],
  },
  logo: '/logo.svg',
  favicons: ['/logo.svg'],
  styles: [
    `
    .dumi-default-doc-layout > main {
      max-width: unset !important;
    }
    .dumi-default-sidebar {
      width: 280px !important;
    }
    .dumi-default-sidebar > dl > dd > a {
      font-size: 14px !important;
    }
    .dumi-default-header-content {
      max-width: unset !important;
    }
    .dumi-default-header-left {
      width: 280px !important;
    }
    .dumi-default-header-right {
      marginLeft: 20px !important;
    }
    `,
  ],
});
