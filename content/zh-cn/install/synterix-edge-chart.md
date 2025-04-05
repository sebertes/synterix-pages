---
title: 安装 synterix-edge
url: /install/edge-chart
index: 3
---

用于向 Kubernetes 集群部署 Synterix Edge 组件的 Helm Chart，支持可配置的命名空间权限管理。

## 核心特性

- 灵活的命名空间管理（支持集群全局或指定命名空间）
- 自动化的 RBAC 配置
- 可定制的部署参数
- 同时支持单命名空间和多命名空间部署模式

## 环境要求

- Kubernetes 1.19+ 版本
- Helm 3.2.0+ 版本
- 执行安装需具备集群管理员权限

## 安装指南

### 添加 Helm 仓库

```bash
helm repo add synterix-edge https://<your-repo-url>
helm repo update
```

### 集群全局模式安装

（授予管理员权限）：

```bash
helm install synterix-edge synterix-edge/synterix-edge --set namespaces[0]="*"
```

### 指定命名空间安装

（仅授权特定命名空间）：

```bash
helm install synterix-edge synterix-edge/synterix-edge --set namespaces={comblox,comblox-test}
```

### 自定义配置安装

创建自定义 values 文件（`custom-values.yaml`）后执行：

```bash
helm install synterix-edge synterix-edge/synterix-edge -f custom-values.yaml
```

## 配置参数说明

| 参数项                      | 功能描述                                       | 默认值                                                            |
|-----------------------------|----------------------------------------------|----------------------------------------------------------------|
| `namespaces`                | 管理的命名空间列表（"*"表示集群全局）           | `["comblox","comblox-test"]`                                   |
| `deployment.replicaCount`   | 副本数量                                      | `1`                                                            |
| `deployment.image.gateway`  | 网关镜像配置                                  | `repository: sebertes/synterix-central-gateway`, `tag: latest` |
| `deployment.image.proxy`    | 代理镜像配置                                  | `repository: sebertes/synterix-kube-proxy`, `tag: latest`      |
| `deployment.resources.proxy`| 代理容器资源限制                              | --                                                             |
| `gateway.url`               | 网关连接地址                                 | `"wss://xxx.com/synterix/gateway"`                             |
| `gateway.token`             | 边缘节点认证令牌                             | `"oWSGibL0fLWMlyzTc3ybdi3t1rbQjj"`                             |
| `gateway.edgeId`            | 边缘节点标识符                               | `"1780350654385859692002162"`                                  |
| `service.type`              | Kubernetes 服务类型                         | `ClusterIP`                                                    |
| `service.ports.gateway`     | 网关服务端口配置                            | `port: 7088`, `targetPort: 7088`                               |

## 系统架构

本 Chart 将部署以下组件：

1. **命名空间**（集群全局模式下自动创建）
2. **RBAC 组件**：
    - 包含管理员权限的 ClusterRole
    - 服务账户(ServiceAccount)
    - 角色绑定（指定命名空间模式）或集群角色绑定（全局模式）
3. **应用组件**：
    - 包含网关和代理容器的 Deployment
    - 网关访问服务(Service)

## 升级流程

```bash
helm upgrade synterix-edge synterix-edge/synterix-edge -f custom-values.yaml
```

## 卸载说明

完整移除 Chart：

```bash
helm uninstall synterix-edge
```

注意：此操作不会删除已创建的命名空间。

## 安全注意事项

1. 使用 `namespaces: ["*"]` 时，服务账户将获得集群管理员权限
2. 请妥善保管边缘节点令牌和ID等敏感信息
3. 生产环境建议使用 Kubernetes Secrets 管理敏感配置