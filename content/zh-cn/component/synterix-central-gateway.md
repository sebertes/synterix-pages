---
title: synterix-central-gateway
url: /component/synterix-central-gateway
index: 1
---

Synterix Central Gateway 是 Synterix 分布式架构体系中的核心通信枢纽，承担着中央集群与外部系统间的安全交互门户角色。作为企业级服务网关，本组件实现了多协议适配、智能路由转发和统一安全管控三大核心能力。

## 核心功能特性

1. **全域接入服务**
    - 提供 HTTPS 加密通信通道，支持 TLS 1.2/1.3 安全协议
    - 多终端类型接入支持：
        * Synterix 客户端应用（Web/Mobile/Desktop）
        * 边缘计算集群节点
        * Synterix 命令行管理工具（CLI）

2. **智能流量代理**
    - 流量分类路由引擎：
        * 管理控制流量 → Synterix-Central-Admin 管理控制台
        * 集群操作指令 → Synterix-Kube-Proxy 集群代理服务
        * 边缘运维流量 → 目标边缘集群端点
    - 动态负载均衡策略
    - 连接健康检查与熔断机制

3. **API 网关功能**
    - 请求鉴权与身份验证
    - 流量监控与 QoS 保障
    - 协议转换与报文重组

## RESTful API 规范

### 集群管理接口

`POST /manage/kube/desc`
- **功能**：获取边缘集群容器描述信息
- **请求参数**：
  ```json
  {
    "edgeId": "集群唯一标识符",
    "timestamp": "请求时间戳",
    "signature": "数字签名"
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "msg": "success",
    "data": {
      "namespace": "kube-system",
      "podName": "kube-proxy-xxxx",
      "containerName": "kube-proxy",
      "containerId": "docker://a1b2c3d4",
    }
  }
  ```

### 服务健康检查

`POST /manage/service/check`
- **功能**：分布式服务健康状态诊断
- **参数规范**：
  ```json
  {
    "host": "服务主机",
    "port": 8080,
    "svc": "服务名称",
    "pod": "pod名称",
    "namespace": "命名空间",
    "edgeId": "边缘集群ID",
  }
  ```
- **返回结果**：
  ```json
  {
    "code": 0,
    "message": "服务可用",
    "data": true
  }
  ```

### 服务调用代理

`POST /manage/service/invoke`
- **功能**：跨集群服务透明调用
- **请求示例**：
  ```json
  {
    "serviceName": "payment-service",
    "namespace": "finance",
    "path": "/v1/transactions",
    "method": "POST",
    "headers": {
      "X-Request-ID": "uuidv4",
      "Content-Type": "application/json"
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
    "timeout": 3000
  }
  ```
- **响应规范**：
  ```json
  {
    "code": 0,
    "data": ""
  }
  ```

### 集群状态查询

`GET /manage/clusters`
- **功能**：获取注册集群拓扑信息
- **响应模型**：
  ```json
  {
    "code": 0,
    "data": [
      {
        "clusterId": "cluster-01",
        "type": "EDGE",
        "status": "HEALTHY",
        "kubeVersion": "1.24.3",
        "kubeAuth": "admin"
      }
    ]
  }
  ```

## WebSocket 通信网关

`/gateway`
- **协议特性**：
    - 支持 STOMP over WebSocket
    - 消息压缩（permessage-deflate）
    - 心跳保持机制（ping/pong）
- **功能说明**：
    1. 实时集群事件推送
    2. 运维指令交互通道
    3. 分布式追踪数据收集

## 安全架构

- 基于 JWT 的身份认证
- 双向 TLS 客户端验证
- 请求签名校验机制