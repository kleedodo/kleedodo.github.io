---
title: reqwest自定义DNS Resolver
createTime: 2025/01/21 14:16:38
permalink: /article/qqw0v0hb/
tags:
    - rust
    - dns
---

## 定义

```rust
use std::{net::SocketAddr, sync::Arc};

use hickory_resolver::{
    config::{LookupIpStrategy, ResolverConfig, ResolverOpts},
    TokioAsyncResolver,
};
use reqwest::dns::{Addrs, Resolve};

#[derive(Debug, Clone)]
pub struct TrustDNSResolver {
    resolver: Arc<TokioAsyncResolver>,
}


impl Default for TrustDNSResolver {
    fn default() -> Self {
        let config = ResolverConfig::cloudflare_https();
        let mut opts = ResolverOpts::default();
        opts.use_hosts_file = false;
        opts.ip_strategy = LookupIpStrategy::Ipv4thenIpv6;
        Self {
            resolver: Arc::new(TokioAsyncResolver::tokio(config, opts)),
        }
    }
}

impl Resolve for TrustDNSResolver {
    fn resolve(&self, name: reqwest::dns::Name) -> reqwest::dns::Resolving {
        let resovler = self.resolver.clone();
        Box::pin(async move {
            let lookup = resovler.lookup_ip(name.as_str()).await?;
            let addrs: Addrs = Box::new(
                lookup
                    .into_iter()
                    .map(|ip_addr| SocketAddr::new(ip_addr, 0)),
            );
            Ok(addrs)
        })
    }
}
```

## 使用

```rust
let trust_dns_resolver = TrustDNSResolver::default();
let client = reqwest::Client::builder()
    .http1_title_case_headers()
    .timeout(Duration::from_secs(15))
    .use_rustls_tls()
    .dns_resolver(Arc::new(trust_dns_resolver))
    .build()
    .unwrap();
```
