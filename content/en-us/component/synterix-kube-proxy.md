---
title: synterix-kube-proxy
url: /component/synterix-kube-proxy
index: 4
---

Synterix-Kube-Proxy is the core **Kubernetes API gateway** component of the Synterix platform, providing a **unified, secure, and high-performance** interface for cluster operations. Acting as a critical middleware layer, it abstracts infrastructure differences and delivers **standardized API access** for upper-layer applications.

## **Key Features**

- **Multi-Cluster Compatibility**:
    - Supports all major Kubernetes distributions (**EKS, AKS, GKE, OpenShift**)
    - Version-agnostic design (compatible with **Kubernetes v1.20+**)

- **Standardized Protocol**:
    - Fully compliant with **Kubernetes REST API specifications**
    - Secure **HTTPS communication** with API Server (OIDC authentication & RBAC authorization)

- **Zero-Trust Security**:
    - Default **ClusterIP** service type
    - Enforces **mTLS mutual authentication** for inter-component communication

- **High-Performance Proxy**:
    - Built-in **connection pooling** and **intelligent caching** to reduce API Server load

- **Observability**:
    - Native **Prometheus metrics** and **OpenTelemetry tracing** support

## **Deployment Recommendations**

1. **Network Topology**:
    - Must be deployed in the **cluster-internal network**
    - **Sidecar deployment** with API Gateway (same Pod) is strongly recommended
    - **Never expose** via NodePort/LoadBalancer

2. **Resource Allocation**:
    - Production: **500m CPU + 512Mi Memory** (minimum)

## **Architectural Benefits**

✔ **Decoupled Design**: Isolates platform logic from Kubernetes infrastructure, ensuring independent upgrades  
✔ **Traffic Control**: All traffic must route through Gateway for **centralized auditing & security policies**  
✔ **Elastic Scalability**: Stateless architecture supports **horizontal scaling** for high-concurrency scenarios

> **Note**: This component is **mission-critical infrastructure**. Configuration changes require **change management approval**. For fine-grained access control, integrate with **Synterix-IAM**.