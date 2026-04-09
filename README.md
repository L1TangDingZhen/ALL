# ONE - Integrated Web Applications Portfolio

A portfolio showcasing three full-stack web applications, deployed as a unified microservices architecture with CI/CD.

## Overview

This repository contains three independent yet integrated web applications:

- **Full-stack Development** - Frontend (React, Vue.js) + Backend (ASP.NET Core, Django)
- **Real-time Communication** - WebRTC peer-to-peer connections, SignalR hubs
- **3D Visualization** - Three.js interactive 3D rendering
- **Containerization** - Docker multi-service deployment with Nginx reverse proxy
- **CI/CD** - GitHub Actions automated build and deployment

## Tech Stack

### Frontend
- **React 18** - P2P File Transfer & Box Placement UI
- **Vue.js 3** - Student Management System & Food Selector
- **Three.js** - 3D visualization and rendering
- **Material-UI / Element Plus** - Modern UI components
- **TypeScript** - Type-safe development

### Backend
- **ASP.NET Core 8** - High-performance C# backend
- **Django 4 + DRF** - Python REST framework
- **SignalR** - Real-time bidirectional communication
- **SQLite** - Lightweight database
- **JWT** - Secure authentication

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy with HTTPS (Cloudflare Origin Certificate)
- **Docker Hub** - Image registry

## Projects

### 1. P2P File Transfer System

A peer-to-peer file sharing application with invitation-based authentication.

- WebRTC direct peer connections (no server storage)
- Real-time file transfer with progress tracking
- Invitation code system for secure pairing
- SignalR signaling server for connection establishment
- Chunk-based transfer with flow control for large files

**Tech:** ASP.NET Core + React + SignalR + WebRTC

---

### 2. Student Enrollment & Grade Management

A comprehensive course management system with role-based access control.

- Multi-role support (Student, Teacher, Admin)
- Course enrollment and capacity management
- Grade tracking and reporting
- JWT-based authentication

**Tech:** Django + Vue.js + SQLite + JWT

---

### 3. Box Placement Visualization

A 3D bin packing algorithm visualizer with interactive rendering.

- Interactive 3D space visualization
- Custom packing algorithm support
- Real-time 3D rendering with Three.js
- Layer-by-layer view mode

**Tech:** Django + React + Three.js

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Nginx :80 / :443                       │
│            (Reverse Proxy + Cloudflare SSL)               │
└───────┬─────────────────┬─────────────────┬──────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Student SPA  │ │   P2P SPA     │ │   Box SPA     │
│  (Vue.js)     │ │   (React)     │ │   (React)     │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│student-backend│ │  p2p-backend  │ │  box-backend  │
│   (Django)    │ │  (ASP.NET)    │ │   (Django)    │
└───────────────┘ └───────────────┘ └───────────────┘
```

All services run on a shared Docker bridge network. Nginx handles SSL termination, static file serving, and reverse proxying to backend services.

## CI/CD Pipeline

Automated via GitHub Actions on push to `main`:

1. **Build** - 4 parallel Docker image builds (3 backends + 1 integrated nginx with all frontends)
2. **Push** - Images pushed to Docker Hub
3. **Deploy** - SSH into EC2, pull latest images, `docker compose up -d`

## Local Development

### P2P System

```bash
# Backend
cd P2P/P2P
dotnet run  # http://localhost:5235

# Frontend
cd P2P/p2p-client
npm install && npm start  # http://localhost:3000
```

### Student System

```bash
# Backend
cd Student_Enroll_Grade_System/final
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # http://localhost:8000

# Frontend
cd Student_Enroll_Grade_System/front_end
npm install && npm run dev  # http://localhost:5173
```

### Box System

```bash
# Backend
cd box/box_back/box_back
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # http://localhost:8000

# Frontend
cd box/box_show
npm install && npm start  # http://localhost:3000
```

## Project Structure

```
ONE/
├── P2P/                                # P2P File Transfer
│   ├── P2P/                            # ASP.NET Core Backend
│   │   ├── Controllers/
│   │   ├── Hubs/                       # SignalR Hubs
│   │   ├── Models/
│   │   └── Services/
│   └── p2p-client/                     # React Frontend
│
├── Student_Enroll_Grade_System/        # Student Management
│   ├── final/                          # Django Backend
│   │   └── back/                       # App Module
│   └── front_end/                      # Vue.js Frontend
│
├── box/                                # Box Placement Visualizer
│   ├── box_back/box_back/              # Django Backend
│   └── box_show/                       # React Frontend (Three.js)
│
├── nginx/                              # Nginx Config & Multi-stage Dockerfile
├── .github/workflows/deploy.yml        # CI/CD Pipeline
├── docker-compose-production.yml       # Production Orchestration
└── CLAUDE.md                           # Development Guidelines
```
