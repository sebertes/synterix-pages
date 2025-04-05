---
title: synterix-central-gateway
url: /component/synterix-central-gateway
index: 1
---

The **Synterix Central Gateway** serves as the **central communication hub** in the Synterix distributed architecture, acting as a **secure entry point** for interactions between the central cluster and external systems. This enterprise-grade gateway delivers three core capabilities:
- **Multi-protocol adaptation**
- **Intelligent traffic routing**
- **Unified security enforcement**

## **Key Features**

### **1. Universal Access Service**
- **HTTPS/TLS 1.2/1.3** encrypted communication
- **Multi-client support**:
    - Synterix client applications (Web/Mobile/Desktop)
    - Edge computing clusters
    - Synterix Command-Line Interface (CLI)

### **2. Intelligent Traffic Proxy**
- **Dynamic routing engine**:
    - **Administrative traffic** → `synterix-central-admin`
    - **Cluster operations** → `synterix-kube-proxy`
    - **Edge O&M traffic** → Target edge clusters
- **Load balancing** (round-robin/least-connections)
- **Health checks & circuit breaking**

### **3. API Gateway Capabilities**
- **Authentication & authorization** (JWT/OAuth2)
- **Traffic monitoring & QoS enforcement**
- **Protocol translation & payload transformation**

## **RESTful API Specifications**

### **1. Cluster Management API**
**`POST /manage/kube/desc`**
- **Purpose**: Retrieve edge cluster container metadata
- **Request**:
  ```json
  {
    "edgeId": "cluster-identifier",
    "timestamp": "ISO-8601",
    "signature": "HMAC-SHA256"
  }
  ```
- **Response**:
  ```json
  {
    "code": 0,
    "msg": "success",
    "data": {
      "namespace": "kube-system",
      "podName": "kube-proxy-xxxx",
      "containerId": "dkube-proxy",
      "containerName": "192.168.1.100",
    }
  }
  ```

### **2. Service Health Check**
**`POST /manage/service/check`**
- **Purpose**: Distributed service health diagnostics
- **Request**:
  ```json
  {
    "host": "service.example.com",
    "port": 8080,
    "svc": "payment-service",
    "pod": "",
    "namespace": "",
    "edgeId": ""
  }
  ```
- **Response**:
  ```json
  {
    "code": 0,
    "msg": "",
    "data": true
  }
  ```

### **3. Service Invocation Proxy**
**`POST /manage/service/invoke`**
- **Purpose**: Cross-cluster service invocation
- **Request**:
  ```json
  {
    "serviceName": "inventory-service",
    "namespace": "retail",
    "path": "/api/v1/stock",
    "method": "GET",
    "headers": {
      "X-Request-ID": "uuidv4"
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
    "edgeId": "edge-cluster-03"
  }
  ```
- **Response**:
  ```json
  {
    "code": 0,
    "data": { /* service response */ }
  }
  ```

### **4. Cluster Topology Query**
**`GET /manage/clusters`**
- **Purpose**: Retrieve registered cluster topology
- **Response**:
  ```json
  {
    "code": 0,
    "data": [
      {
        "clusterId": "edge-us-west-1",
        "status": "HEALTHY",
        "kubeVersion": "1.26.0",
        "kubeAuth": "admin"
      }
    ]
  }
  ```

## **WebSocket Gateway**
**Endpoint**: `/gateway`

### **Protocol Features**
- **STOMP over WebSocket** support
- **Per-message compression** (deflate)
- **Heartbeat mechanism** (ping/pong, 30s interval)

### **Use Cases**
1. **Real-time cluster event streaming**
2. **Interactive command execution**
3. **Distributed tracing data collection**

## **Security Architecture**
- **Mutual TLS (mTLS)** for client authentication
- **JWT-based access control**
- **Request signing validation** (HMAC-SHA256)
