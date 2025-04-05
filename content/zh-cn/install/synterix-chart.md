---
title: 安装 synterix-central
url: /install/chart
index: 1
---

## Helm Chart

- 部署组件包括：
    - synterix-central-gateway
    - synterix-kube-proxy
    - synterix-central-admin（带持久化存储的 StatefulSet）
    - 必要的 RBAC、服务账户和密钥
    - 可配置的 Ingress

## 先决条件

- Kubernetes 1.19+
- Helm 3.2.0+
- Ingress 控制器（如需使用 Ingress）
- 底层基础设施支持 PV 供应（用于 StatefulSet 持久化）

## 安装指南

### 添加 Helm 仓库

```bash
helm repo add synterix https://chart.synterix.cloud
helm repo update
```

### 安装 Chart

```bash
helm install synterix synterix/synterix \
  --namespace synterix \
  --create-namespace \
  --version 0.1.0
```

### 自定义安装

```bash
helm install synterix synterix/synterix \
  --namespace synterix \
  --set ingress.host="custom.example.com" \
  --set centralAdmin.storage.size="5Gi" \
  --set global.secret.data="$(echo -n 'newsecret' | base64)"
```

## 配置参数

| 参数 | 描述 | 默认值 |
|------|------|-------|
| `global.namespace` | 所有资源的命名空间 | `synterix` |
| `global.secret.name` | 密钥名称 | `synterix-secret` |
| `global.secret.data` | Base64 编码的密钥值 | `c2VjcmV0` ("secret") |
| `serviceAccount.name` | 服务账户名称 | `synterix-central-account` |
| `rbac.bindingName` | 集群角色绑定名称 | `synterix-central-account-binding` |
| `centralGateway.image` | 中央网关镜像 | `sebertes/synterix-central-gateway` |
| `centralGateway.tag` | 镜像标签 | `master` |
| `centralGateway.port` | 服务端口 | `7089` |
| `kubeProxy.image` | Kube 代理镜像 | `sebertes/synterix-kube-proxy` |
| `kubeProxy.tag` | 镜像标签 | `master` |
| `kubeProxy.port` | 服务端口 | `7014` |
| `centralAdmin.image` | 中央管理镜像 | `sebertes/synterix-central-admin` |
| `centralAdmin.tag` | 镜像标签 | `master` |
| `centralAdmin.port` | 服务端口 | `7088` |
| `centralAdmin.dbPath` | 数据库路径 | `"/synterix/synterix.db"` |
| `centralAdmin.storage.size` | PVC 存储大小 | `1Gi` |
| `ingress.enabled` | 启用 Ingress | `true` |
| `ingress.className` | Ingress 类别 | `nginx` |
| `ingress.host` | Ingress 主机 | `yuntuops.bjttsx.com` |
| `ingress.path` | Ingress 路径 | `/synterix/(.*)` |

## 资源分配

默认资源配置如下：

- **中央网关**：
    - 请求资源：200m CPU，256Mi 内存
    - 限制资源：500m CPU，512Mi 内存

- **Kube 代理**：
    - 请求资源：200m CPU，256Mi 内存
    - 限制资源：500m CPU，512Mi 内存

- **中央管理**：
    - 请求资源：200m CPU，256Mi 内存
    - 限制资源：500m CPU，512Mi 内存

## 持久化存储

中央管理组件使用 PersistentVolumeClaim，配置如下：

- 访问模式：ReadWriteOnce
- 默认大小：1Gi

## 升级指南

```bash
helm upgrade synterix synterix/synterix \
  --namespace synterix \
  --version <新版本号>
```

## 卸载指南

卸载/删除部署：

```bash
helm uninstall synterix --namespace synterix
```

注意：此操作不会移除 PersistentVolumeClaim。如需完全删除所有资源：

```bash
helm uninstall synterix --namespace synterix
kubectl delete pvc -n synterix -l app.kubernetes.io/instance=synterix
kubectl delete namespace synterix
```

## 故障排查

1. **检查 Pod 状态**：
   ```bash
   kubectl get pods -n synterix
   ```

2. **查看日志**：
   ```bash
   kubectl logs -n synterix -l app=synterix-central
   kubectl logs -n synterix -l app=synterix-central-admin
   ```

3. **检查持久化卷**：
   ```bash
   kubectl get pvc -n synterix