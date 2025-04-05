---
title: synterix-edge-gateway
url: /component/synterix-edge-gateway
index: 3
---

The Synterix Edge Gateway serves as the critical networking component within the Synterix Edge Computing Platform, functioning as a secure communication hub between edge clusters and central clusters. This cloud-native gateway delivers efficient and reliable north-south traffic management, designed according to Kubernetes networking best practices with proven stability under 10K+ concurrent connections.

## Security Policies

1. **Access Control Mechanism**
    - DNS-based Access Control List (ACL) implementation
    - Mutual TLS (mTLS) authentication for transport security
    - Built-in IP Spoofing Protection

2. **Network Isolation Principles**
    - Strict adherence to Principle of Least Privilege
    - Pod-level network isolation via NetworkPolicy
    - Complete Internet-facing exposure prohibition

## Core Capabilities

### Data Plane Functions
- **Edge-to-Center Uplink Processing**
    - Real-time service status reporting (heartbeat + health status)
    - Distributed alert aggregation (threshold-triggered)
    - Edge metric compression (Snappy algorithm)

- **Center-to-Edge Downlink Control**
    - Cluster-wide command distribution (with signature verification)
    - Kubernetes resource lifecycle management (CRD operations proxy)
    - Rolling update coordination (Canary Release support)

### Control Plane Functions
- Stateful connection monitoring
- Traffic shaping (QoS policy enforcement)
- Protocol transformation (REST/gRPC bidirectional conversion)

## HTTP API Specification

### Edge Notification Interface
`POST /edge/notify`

**Request Schema**
```json
{
  "serviceName": "payment-service",
  "namespace": "finance",
  "path": "/v1/transactions",
  "method": "POST",
  "headers": {
    "X-Request-ID": "uuidv4",
    "X-Timestamp": "RFC3339 timestamp",
    "Content-Type": "application/json",
    "X-Signature": "HMAC-SHA256 signature"
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

**Response Model**
```json
{
  "code": 0,
  "data": null
}
```

**Status Codes**
| Code | Description              |
|------|--------------------------|
| 0    | Success                  |
| 4001 | Request validation failed|
| 5001 | Upstream unreachable     |
| 5003 | Request timeout          |