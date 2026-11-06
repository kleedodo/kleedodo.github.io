import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/klee.png',
  // your git repo url
  docsRepo: 'https://github.com/kleedodo/kleedodo.github.io',
  docsDir: 'docs',

  appearance: true,

  /**
   * 集合配置（plume 1.0 新路由体系）
   * @see https://theme-plume.vuejs.press/config/collections/
   */
  collections: [
    {
      type: 'post',
      dir: '/',
      title: '博客',
      exclude: ['README.md'], // 首页不算文章
      link: '/blog/', // 文章列表页
      linkPrefix: '/blog/', // 文章链接前缀（与列表页统一）
      autoFrontmatter: {
        permalink: 'filepath', // 用文件路径生成 slug，例如 /article/rust/xxx/
      },
    },
  ],

  profile: {
    avatar: '/klee.png',
    name: 'kleedodo',
    description: '嘟嘟可是家人',
    //circle: true,
    location: '提瓦特·蒙德',
    organization: '西风骑士团',
  },

  navbar,
  social: [
    { icon: 'github', link: 'https://github.com/kleedodo/' },
  ],

})
