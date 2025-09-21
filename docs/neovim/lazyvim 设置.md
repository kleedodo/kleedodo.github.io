---
title: lazyvim 设置
createTime: 2025/09/21 16:14:33
tags:
    - rust
    - neovim
permalink: /article/l61b712u/
---

## `~/.config/nvim`配置目录结构
```
.
├── init.lua
├── lazy-lock.json
├── lazyvim.json
├── LICENSE
├── lua
│   ├── config
│   │   ├── autocmds.lua
│   │   ├── keymaps.lua
│   │   ├── lazy.lua
│   │   └── options.lua
│   └── plugins
│       └── rustaceanvim.lua
├── README.md
└── stylua.toml

4 directories, 11 files
```


## keymaps

配置文件: `~/.config/nvim/lua/config/keymaps.lua`

使用`jk`来退出插入模式

```lua 
vim.keymap.set("i", "jk", "<Esc>", { noremap = true })

```
## rust-analyzer

配置文件: `~/.config/nvim/lua/plugins/rustaceanvim.lua`

[可以设置的选项](https://rust-analyzer.github.io/book/configuration.html)

```lua 
return {
  "mrcjkb/rustaceanvim",
  opts = {
    server = {
      default_settings = {
        ["rust-analyzer"] = {
          -- ... rust-analyzer相关的设置在这里设置
        },
      },
    },
  },
}

```
::: tip 提示 procMacro async-trait is explitity disabled

在 `rustaceanvim.lua` 文件中写入如下内容，可开启 `async-trait`的宏展开

```lua
return {
  "mrcjkb/rustaceanvim",
  opts = {
    server = {
      default_settings = {
        ["rust-analyzer"] = {
          procMacro = {
            ignored = {
              ["async-trait"] = vim.NIL,
            },
          },
        },
      },
    },
  },
}

```
:::

打开任意rust项目，使用`:LspInfo`查看配置是否生效。
