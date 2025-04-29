---
title: reqwest自定义DNS Resolver
createTime: 2025/01/21 14:16:38
permalink: /article/qqw0v0hb/
tags:
    - rust
    - dns
---

## 定义

只使用google和cloudflare的ipv4服务器

```rust
use std::{
    net::{IpAddr, Ipv4Addr, SocketAddr},
    sync::Arc,
};

use hickory_resolver::{
    TokioResolver,
    config::{
        LookupIpStrategy, NameServerConfigGroup, ResolveHosts, ResolverConfig, ResolverOpts,
        ServerOrderingStrategy,
    },
    name_server::TokioConnectionProvider,
};
use reqwest::dns::{Addrs, Resolve};

#[derive(Debug, Clone)]
pub struct TrustDNSResolver {
    resolver: Arc<TokioResolver>,
}

impl Default for TrustDNSResolver {
    fn default() -> Self {
        let mut name_servers = NameServerConfigGroup::from_ips_https(
            &[
                IpAddr::V4(Ipv4Addr::new(8, 8, 8, 8)),
                IpAddr::V4(Ipv4Addr::new(8, 8, 4, 4)),
            ],
            443,
            "dns.google".to_string(),
            true,
        );
        name_servers.merge(NameServerConfigGroup::from_ips_https(
            &[
                IpAddr::V4(Ipv4Addr::new(1, 1, 1, 1)),
                IpAddr::V4(Ipv4Addr::new(1, 0, 0, 1)),
            ],
            443,
            "cloudflare-dns.com".to_string(),
            true,
        ));
        let name_server_count = name_servers.len();
        let config = ResolverConfig::from_parts(None, vec![], name_servers);
        let mut opts = ResolverOpts::default();
        opts.use_hosts_file = ResolveHosts::Never;
        // 只解析ipv4地址
        opts.ip_strategy = LookupIpStrategy::Ipv4Only;
        opts.server_ordering_strategy = ServerOrderingStrategy::QueryStatistics;
        opts.attempts = 3;
        opts.num_concurrent_reqs = name_server_count;
        let mut resolver_builder =
            TokioResolver::builder_with_config(config, TokioConnectionProvider::default());
        *resolver_builder.options_mut() = opts;
        Self {
            resolver: Arc::new(resolver_builder.build()),
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
    .connect_timeout(Duration::from_secs(15))
    .use_rustls_tls()
    .dns_resolver(Arc::new(trust_dns_resolver))
    .build()
    .unwrap();
```
