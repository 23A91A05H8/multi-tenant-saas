# Multi-Tenant SaaS Application

This project is a **Multi-Tenant SaaS platform** designed to support multiple organizations (tenants) using a single backend and database while ensuring **strict data isolation**, **role-based access control**, and **subscription limit enforcement**.

The system is built as part of an academic evaluation to demonstrate real-world SaaS architecture, authentication, authorization, and scalability concepts.

---

## 🚀 Key Features

- Multi-tenant architecture (single database, tenant-based isolation)
- JWT-based authentication and authorization
- Role-Based Access Control (RBAC)
  - Super Admin
  - Tenant Admin
  - Tenant User
- Subscription limits per tenant
  - Maximum projects per tenant
  - Maximum users per tenant
- Secure CRUD operations
  - Tenants
  - Users
  - Projects
  - Tasks
- Audit logging for critical actions
- Fully Dockerized setup
- Frontend and backend separation

---

## 🛠 Technology Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

### Frontend
- React
- HTML, CSS, JavaScript
- REST API integration

### DevOps / Infrastructure
- Docker
- Docker Compose

---

## 📂 Folder Structure

multi-tenant-saas/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ ├── config/
│ │ ├── utils/
│ │ └── app.js
│ ├── Dockerfile
│ └── package.json
│
├── frontend/
│ ├── src/
│ └── package.json
│
├── docs/
│ ├── research.md
│ ├── PRD.md
│ ├── architecture.md
│ ├── technical-spec.md
│ └── images/
│
├── docker-compose.yml
├── README.md
└── submission.json

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
Make sure you have the following installed:
- Docker
- Docker Compose

---

### 2️⃣ Start the application

From the project root directory:

```bash
docker-compose up -d
This will start:

Backend server → http://localhost:5000

Frontend application → http://localhost:3000

PostgreSQL database (containerized)