---
title: 生成用于github仓库的ssh密钥
tags:
  - ssh
createTime: 2024/09/23 02:11:43
permalink: /article/h3mq5cdy/
---

```sh
# 生成ssh公钥和私钥
# 根据提示输入相应的信息
ssh-keygen -t ed25519 -C "your_email@example.com"

# 将密钥托管到ssh-agent，这样不用每次都输入密码
ssh-add ~/.ssh/id_ed25519

# 测试是否成功
ssh -T git@github.com
```

在测试是否成功之前，需要配置`~/.ssh/config`:

```conf
Host github.com
  User git
  Hostname github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```