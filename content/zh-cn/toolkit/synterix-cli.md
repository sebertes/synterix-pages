---
title: Synterix CLI
url: /toolkit/cli
index: 18
---

Synterix CLI 专为管理本地工作区和代理服务而设计。该工具提供了简单直观的命令行界面，帮助开发者高效管理开发环境中的工作区和网络代理配置。

```aiignore
Usage: synterix [options] [command]

Synterix CLI toolkit 1.0.0

workspace|ws           Manage local workspaces
  create          create a new workspace
  remove          remove a workspace
  toggle          toggle a workspace as default
  list            list all local workspace
  host            set a workspace host
  token           set a workspace token

proxy|px           Manage local proxies
  add             create a new proxy
  remove          remove a proxy
  list            list all local proxies
  start           start a proxy
  stop            stop a proxy

Options:
  -V, --version                  output the version number

```

## 安装

```aiignore
npm install -g synterix-cli
```

### 工作区管理 (workspace/ws)

- **create** - 创建一个新的工作区
- **remove** - 删除现有工作区
- **toggle** - 将某个工作区设置为默认工作区
- **list** - 列出所有本地工作区
- **host** - 设置工作区的主机地址
- **token** - 设置工作区的访问令牌

### 代理管理 (proxy/px)

- **add** - 创建新的代理配置
- **remove** - 移除现有代理
- **list** - 列出所有本地代理配置
- **start** - 启动代理服务
- **stop** - 停止代理服务

## 使用选项

- `-V, --version` - 显示当前工具版本号

## 典型使用场景

1. **初始化开发环境**：
   ```bash
   synterix ws create my-project
   synterix ws host my-project https://api.example.com
   synterix ws token my-project my-secret-token
   ```

2. **代理管理**：
   ```bash
   synterix px add my-proxy --port 8080
   synterix px start my-proxy
   synterix px list
   ```

3. **切换默认工作区**：
   ```bash
   synterix ws toggle my-project
   ```