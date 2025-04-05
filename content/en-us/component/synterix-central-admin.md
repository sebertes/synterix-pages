---
title: synterix-central-admin
url: /component/synterix-central-admin
index: 2
---

The **synterix-central-admin** is the core administrative service of the **Synterix Data Management Platform**, acting as the central control plane for managing system-wide operations. Designed as a microservice, it provides unified identity management, authentication, and cluster coordination for the Synterix ecosystem.

## **Core Features**

### **1. Identity & Access Management (IAM)**
- **JWT (JSON Web Token) Authentication** – Secure token-based authentication
- **API Token Lifecycle Management** – Generation, rotation, and revocation
- **Role-Based Access Control (RBAC)** – Fine-grained permission policies

### **2. User Management**
- **User CRUD Operations** – Create, read, update, and delete user profiles
- **Group/Role Assignment** – Organizational role management
- **Password Policy Enforcement** – Configurable security requirements

### **3. Edge Cluster Management**
- **Cluster Registration & Discovery** – Automated onboarding of edge nodes
- **Metadata & Configuration Storage** – Centralized cluster state tracking
- **Health Monitoring** – Status reporting and heartbeat checks

### **4. Security Services**
- **Token Issuance & Validation** – Secure cryptographic signing
- **Key Management** – Encryption key storage and rotation
- **Audit Logging** – Immutable record of administrative actions

## **Architecture & Deployment**

### **Network Security**
- **Zero Direct Exposure** – All traffic **must** route through **synterix-central-gateway**
- **mTLS (Mutual TLS) Encryption** – Enforced for internal service communication

### **Data Persistence**
- **PVC (Persistent Volume Claim) Backed Storage** – Ensures high availability
- **SQLite Database** – Lightweight, embedded storage engine
- **Automated Backups** – Scheduled snapshots for disaster recovery

### **Service Coordination**
- **Co-Location with Gateway** – Must be deployed in the **same Kubernetes namespace** as **synterix-central-gateway**
- **Dynamic Service Discovery** – Automatically detects and connects to the gateway
- **Event-Driven Notifications** – Propagates configuration changes to downstream services

## **Security Best Practices**
- **Never expose directly to external networks** – Strictly internal-facing
- **Enforce Network Policies** – Restrict ingress/egress traffic
- **Regular Key Rotation** – Mitigate credential compromise risks
- **Enable Detailed Audit Logs** – For compliance and forensics

## **Dependencies**
- **Kubernetes 1.19+**
- **Persistent Storage Volume**
- **synterix-central-gateway** (mandatory for routing)