import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const dnsNote = defineNoteConfig({
  dir: "dns",
  link: "/dns",
  sidebar: ["", "doh"],
});

const rustNote = defineNoteConfig({
  dir: "rust",
  link: "rust",
  sidebar: [""],
});

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [dnsNote, rustNote],
});
