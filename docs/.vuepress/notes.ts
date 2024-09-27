import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const someNote = defineNoteConfig({
  dir: "",
  link: "/",
  sidebar: [""]
});

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [someNote],
});
