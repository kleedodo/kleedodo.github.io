import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/klee.png',
  // your git repo url
  docsRepo: 'https://github.com/kleedodo/kleedodo.github.io',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: '/klee.png',
    name: 'kleedodo',
    description: '嘟嘟可是家人',
    //circle: true,
    location: '提瓦特·蒙德',
    organization: '西风骑士团',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://github.com/kleedodo/' },
  ],

})
