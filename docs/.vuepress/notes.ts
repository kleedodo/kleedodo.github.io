import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const dnsNote = defineNoteConfig({
  dir: 'dns',
  link: '/dns',
  sidebar: ['', "doh"],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [dnsNote],
})
