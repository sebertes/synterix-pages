---
title: synterix-edge-gateway
url: /component/synterix-edge-gateway
index: 3
---

Synterix Edge Gateway 是 Synterix 边缘计算平台的核心网络组件，作为边缘集群与中央集群之间的安全通信枢纽，提供高效可靠的南北向流量管控能力。本网关采用云原生架构设计，符合 Kubernetes 网络最佳实践，支持万级并发连接下的稳定数据传输。

## 安全策略

1. **访问控制机制**
    - 实施基于域名的白名单访问控制（DNS-based ACL）
    - 支持双向 TLS 认证（mTLS）确保传输层安全
    - 内置 IP 地址欺骗防护（IP Spoofing Protection）

2. **网络隔离原则**
    - 严格遵循最小权限原则（Principle of Least Privilege）
    - 通过 NetworkPolicy 实现 Pod 级网络隔离
    - 禁止任何形式的公网暴露（Internet-facing 禁止）

## 核心功能

### 数据平面功能
- **边缘到中心的上行流量处理**
    - 服务状态实时上报（心跳检测 + 健康状态）
    - 分布式预警信息聚合上报（支持阈值触发）
    - 边缘指标数据压缩传输（Snappy 压缩算法）

- **中心到边缘的下行控制**
    - 集群级控制指令分发（指令签名验证）
    - Kubernetes 资源生命周期管理（CRD 操作代理）
    - 滚动更新协调器（Canary Release 支持）

### 控制平面功能
- 连接状态监控（Stateful Inspection）
- 流量整形（QoS 策略实施）
- 协议转换（REST/gRPC 双向转换）

## HTTP API 规范

### 边缘通知接口
`POST /edge/notify`

**请求规范**
```json
{
  "serviceName": "payment-service",
  "namespace": "finance",
  "path": "/v1/transactions",
  "method": "POST",
  "headers": {
    "X-Request-ID": "uuidv4",
    "X-Timestamp": "RFC3339格式时间戳",
    "Content-Type": "application/json",
    "X-Signature": "HMAC-SHA256签名"
  },
  "query": {
    "page": 1,
    "size": 20
  },
  "pathVariables": {},
  "body": {
    "amount": 99.99,
    "currency": "USD"
  },
  "edgeId": "edge-cluster-03",
  "timeout": 3000,
  "retryPolicy": {
    "maxAttempts": 3,
    "backoff": 1000
  }
}
```

**响应模型**
```json
{
  "code": 0,
  "data": null
}
```

**状态码说明**
| 代码 | 含义                     |
|------|--------------------------|
| 0     | 成功处理                 |
| 4001 | 请求验证失败             |
| 5001 | 上游服务不可达           |
| 5003 | 请求超时                 |