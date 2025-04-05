---
title: synterix-central-admin
url: /component/synterix-central-admin
index: 2
---

synterix-central-admin 是 Synterix 数据管理平台的核心管理服务组件，作为平台的中枢管理系统，负责处理所有管理平面的核心功能。该服务采用微服务架构设计，为整个 Synterix 生态系统提供统一的管理接口和认证授权服务。

## 核心功能模块

### 1. 身份认证与授权管理
- 基于 JWT (JSON Web Token) 的认证体系
- 多因素认证支持
- 细粒度访问控制(ACL)管理
- API Token 全生命周期管理(创建、轮换、撤销)

### 2. 用户管理系统
- 用户信息CRUD操作
- 用户属性管理
- 密码策略实施

### 3. 边缘集群管理
- 边缘集群注册
- 集群元数据管理
- 集群证书管理

### 4. 安全服务
- Token签发与验证服务
- 加密密钥管理
- 安全策略实施
- 审计日志记录

## 架构特性

### 网络拓扑
- 采用最小化暴露面设计原则
- 所有外部访问必须通过 synterix-central-gateway 进行代理转发
- 内部服务间通信采用双向TLS认证

### 数据持久化
- 使用高可用存储架构
- 基于PVC(Persistent Volume Claim)的持久化存储
- SQLite 嵌入式数据库引擎

### 服务发现与通信
- 自动服务发现机制
- 与 synterix-central-gateway 协同部署要求
    - 必须部署在同一Kubernetes命名空间
    - 自动建立安全通信通道
- 实时事件通知系统
    - 数据变更事件发布
    - 网关同步通知

## 安全建议
- 禁止直接对外暴露服务端口
- 建议配置网络策略限制访问源
- 定期轮换加密密钥

## 依赖项
- Kubernetes 1.19+
- 持久化存储卷
- synterix-central-gateway 服务