---
title: cloudns域名托管到cloudflare
createTime: 2025/03/13 02:46:50
tags:
 - dns
 - cloudflare
 - cloudns
permalink: /article/sa20buuf/
---

## 方式一：直接用cloudflare的CDN

cloudflare 需要添加的域名：

| 类型 | 名称 | 内容 | 代理状态 |
| - | - | - | - |
| A | cname | 8.8.8.8 | 开启 |

::: tip 提示
`cname`可以是其他名字，随便起。

`8.8.8.8`可以是任意ip，只要不是cloudflare的ip就可以。
:::

cloudns 需要添加的域名

| Host | Type | Points To |
| - | - | - |
| a.ip-ddns.com| NS | sample.ns.cloudflare.com |
| a.ip-ddns.com| NS | sample2.ns.cloudflare.com |
| *.ip-ddns.com | CNAME| cname.ip-ddns.com | 
| cname.ip-ddns.com | NS | sample.ns.cloudflare.com |
| cname.ip-ddns.com | NS | sample2.ns.cloudflare.com |
| _acme-challenge.a.ip-ddns.com | NS | sample.ns.cloudflare.com |
| _acme-challenge.a.ip-ddns.com | NS | sample2.ns.cloudflare.com |


::: tip 提示
`a.ip-ddns.com` 替换为你自己的域名。

`sample.ns.cloudflare.com` 替换为cloudflare给你分配的`NS`域名。

`_acme-challenge` 使用`NS`是为了方便，如果是用`TXT`类型的话，则每三个月要更新一次。
:::

## 方式二：使用第三方CNAME域名


cloudflare 需要添加的域名：

| 类型 | 名称 | 内容 | 代理状态 |
| - | - | - | - |
| CNAME | cname | speed.marisalnc.com | 关闭 |

::: tip 提示
`cname`可以是其他名字，随便起。

`speed.marisalnc.com` 可以是其他的[CloudFlare公共Cname域名](https://www.wetest.vip/page/cloudflare/cname.html)
:::


cloudns 需要添加的域名和方式一一样。

## worker 的使用

直接在 worker的`设置` => `域和路由` 设置`自定义域`即可，不用管边缘证书是否通过验证，你甚至可以删除掉添加这个worker`自定义域`时新增的证书。

因为在我们把域名托管到cloudflare时，就已经有了根域名和通配符域名的证书了。

## 子域名的使用

和其他域名一样正常在cloudflare添加子域名的DNS记录即可。
