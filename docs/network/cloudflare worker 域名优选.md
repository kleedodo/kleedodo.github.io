---
title: cloudflare worker 域名优选
createTime: 2025/03/14 00:42:00
permalink: /article/kr35nk6o/
tags:
 - dns
 - cloudflare
---

在域名的DNS记录里添加如下记录：

| 类型 | 名称 | 内容 | 代理状态 |
| - | - | - | - |
| CNAME | myworker | myworker.cf.090227.xyz | 关闭 |

::: info 信息
小黄云，即cdn代理一定要关闭。

`myworker.cf.090227.xyz` 是cloudflare的[优选域名](https://cf.090227.xyz/)，更多[优选域名](https://blog.cmliussss.com/p/CloudFlare%E4%BC%98%E9%80%89/#%E6%88%91%E7%BB%B4%E6%8A%A4%E7%9A%84%E4%BC%98%E9%80%89%E5%AE%98%E6%96%B9%E5%9F%9F%E5%90%8D%EF%BC%8C%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%EF%BC%9Ahttps-cf-090227-xyz)
:::

在 `workers路由` 里点击`添加路由`。

选中你的worker，比如我这里的worker叫 `myworker`。

`路由` 填你域名，即 `myworker.domain.com/*`。

::: important 重要

`路由` 后面一定要加`/*`,示例： `myworker.domain.com/*`。
:::
