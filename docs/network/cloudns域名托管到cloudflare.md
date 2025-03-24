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
`cname`可以是其他名字，随便起，但是这里用了`cname`这个名字，那么cloudns也需要用这个名字。

`8.8.8.8`可以是任意ip，只要不是cloudflare的ip就可以。
:::

cloudns 需要添加的域名

| Host | Type | Points To |
| - | - | - |
| a.ip-ddns.com| NS | sample.ns.cloudflare.com |
| a.ip-ddns.com| NS | sample2.ns.cloudflare.com |
| *.a.ip-ddns.com | CNAME| cname.a.ip-ddns.com | 
| cname.a.ip-ddns.com | NS | sample.ns.cloudflare.com |
| cname.a.ip-ddns.com | NS | sample2.ns.cloudflare.com |
| _acme-challenge.a.ip-ddns.com | NS | sample.ns.cloudflare.com |
| _acme-challenge.a.ip-ddns.com | NS | sample2.ns.cloudflare.com |


::: tip 提示
`a.ip-ddns.com` 替换为你自己的域名。

`sample.ns.cloudflare.com` 替换为cloudflare给你分配的`NS`域名。

`_acme-challenge` 使用`NS`是为了方便，如果是用`TXT`类型的话，则每三个月要更新一次。
:::

## 方式二：使用第三方优选域名


cloudflare 需要添加的域名：

| 类型 | 名称 | 内容 | 代理状态 |
| - | - | - | - |
| CNAME | cname | speed.marisalnc.com | 关闭 |

::: tip 提示
`cname`可以是其他名字，随便起，但是这里用了`cname`这个名字，那么cloudns也需要用这个名字。

`speed.marisalnc.com` 可以是其他的优选域名:

- [CloudFlare公共Cname域名](https://www.wetest.vip/page/cloudflare/cname.html)
- [cmliussss 维护的cloudflare 优选域名](https://blog.cmliussss.com/p/CloudFlare%E4%BC%98%E9%80%89/#%E6%88%91%E7%BB%B4%E6%8A%A4%E7%9A%84%E4%BC%98%E9%80%89%E5%AE%98%E6%96%B9%E5%9F%9F%E5%90%8D%EF%BC%8C%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%EF%BC%9Ahttps-cf-090227-xyz)
:::

::: caution 注意
当使用优选域名具有国内外分流的特性时，不要用国外的dns服务器做解析，否则你将得到国外的优选ip，而这些ip国内不一定能访问得了。
:::

cloudns 需要添加的域名和方式一一样。

## 方式三(推荐)：直接在cloudns上面使用优选域名

cloudflare 需要添加的域名：

| 类型 | 名称 | 内容 | 代理状态 |
| - | - | - | - |
| A | web | 8.8.8.8 | 开启 |

::: tip 提示
`web`是你要使用的域名，可以是其他名字，随便起。每一个子域名都需要重新在cloudflare上面添加一个dns记录。

`8.8.8.8`可以是任意ip，只要不是cloudflare的ip就可以。

这一步是让cloudflare的网络里有我们的域名。
:::

cloudns 需要添加的域名

| Host | Type | Points To |
| - | - | - |
| a.ip-ddns.com| NS | sample.ns.cloudflare.com |
| a.ip-ddns.com| NS | sample2.ns.cloudflare.com |
| *.a.ip-ddns.com | CNAME| freeyx.cloudflare88.eu.org  |
| _acme-challenge.a.ip-ddns.com | NS | sample.ns.cloudflare.com |
| _acme-challenge.a.ip-ddns.com | NS | sample2.ns.cloudflare.com |

::: tip 提示
这里直接在cloudns上面使用优选域名`freeyx.cloudflare88.eu.org`
:::

在cloudflare上添加的任何子域名都会被导去优选域名。

当流量到来时,通过子域名的cname来到优选域名，在访问优选域名时会在cloudflare的边缘cdn节点处理请求，会按照cloudflare上的dns记录去引导流量。

如果是本身就在cloudflare上的服务，比如worker，则子域名的目标地址可以随意填写不在cloudflare网络里的ip。

如果不是在cloudflare上的服务，则需要填写实际的ip地址。

