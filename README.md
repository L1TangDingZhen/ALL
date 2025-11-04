# ONE - Integrated Web Applications Portfolio

A comprehensive portfolio showcasing three full-stack web applications with modern technologies and microservices architecture.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)](docker-compose.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Projects](#projects)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

This repository contains three independent yet integrated web applications demonstrating proficiency in:

- **Full-stack Development** - Frontend (React, Vue.js) + Backend (ASP.NET Core, Django)
- **Real-time Communication** - WebRTC peer-to-peer connections, SignalR hubs
- **3D Visualization** - Three.js interactive 3D rendering
- **Containerization** - Docker multi-service deployment with Nginx reverse proxy
- **RESTful APIs** - Clean API design with JWT authentication

## 🛠 Tech Stack

### Frontend
- **React 18** - P2P File Transfer & Box Placement UI
- **Vue.js 3** - Student Management System
- **Three.js** - 3D visualization and rendering
- **Material-UI / Element Plus** - Modern UI components
- **TypeScript** - Type-safe development

### Backend
- **ASP.NET Core 8** - High-performance C# backend
- **Django 4 + DRF** - Python REST framework
- **SignalR** - Real-time bidirectional communication
- **MySQL** - Relational database
- **JWT** - Secure authentication

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy and load balancing
- **Git** - Version control

## 📦 Projects

### 1. P2P File Transfer System

A peer-to-peer file sharing application with invitation-based authentication.

**Key Features:**
- WebRTC direct peer connections (no server storage)
- Real-time file transfer with progress tracking
- Invitation code system for secure pairing
- SignalR signaling server for connection establishment
- Chunk-based transfer for large files

**Tech:** ASP.NET Core + React + SignalR + WebRTC

**Endpoints:**
- Frontend: `http://localhost/p2p`
- Backend API: `http://localhost/api/p2p`

---

### 2. Student Enrollment & Grade Management

A comprehensive course management system with role-based access control.

**Key Features:**
- Multi-role support (Student, Teacher, Admin)
- Course enrollment and capacity management
- Grade tracking and reporting
- JWT-based authentication
- RESTful API with OpenAPI documentation

**Tech:** Django + Vue.js + MySQL + JWT

**Endpoints:**
- Frontend: `http://localhost/`
- Backend API: `http://localhost/api/student`

---

### 3. Box Placement Visualization

A 3D bin packing algorithm visualizer with custom algorithm support.

**Key Features:**
- Interactive 3D space visualization
- Custom packing algorithm upload (for research/testing)
- Real-time 3D rendering with Three.js
- Layer-by-layer view mode
- Collision detection and validation

**Tech:** Django + React + Three.js

**Endpoints:**
- Frontend: `http://localhost/box`
- Backend API: `http://localhost/api/box`

## 🚀 Quick Start

### Prerequisites

- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Git**

### One-Command Deployment

```bash
# Clone the repository
git clone https://github.com/yourusername/ONE.git
cd ONE

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### Access Applications

- **Student System**: http://localhost/
- **P2P Transfer**: http://localhost/p2p
- **Box Visualizer**: http://localhost/box

### Stop Services

```bash
docker-compose down
```

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Nginx :80                         │
│              (Reverse Proxy & Load Balancer)             │
└───────┬─────────────────┬─────────────────┬─────────────┘
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

### Network Configuration

All services run on a shared Docker bridge network (`app-network`), enabling inter-service communication.

### Port Mapping

| Service | Internal Port | External Port | Protocol |
|---------|---------------|---------------|----------|
| Nginx   | 80            | 80            | HTTP     |
| P2P Backend | 5235      | -             | HTTP     |
| Student Backend | 8000  | -             | HTTP     |
| Box Backend | 8000      | -             | HTTP     |

## 💻 Development

### Local Development Setup

#### P2P System

```bash
# Backend
cd P2P/P2P
dotnet restore
dotnet run  # Runs on http://localhost:5235

# Frontend
cd P2P/p2p-client
npm install
npm start  # Runs on http://localhost:3000
```

#### Student System

```bash
# Backend
cd Student_Enroll_Grade_System/final
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # Runs on http://localhost:8000

# Frontend
cd Student_Enroll_Grade_System/front_end
npm install
npm run dev  # Runs on http://localhost:5173
```

#### Box System

```bash
# Backend
cd box/box_back/box_back
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # Runs on http://localhost:8000

# Frontend
cd box/box_show
npm install
npm start  # Runs on http://localhost:3000
```

### Environment Variables

Create `.env` files in each project root:

**Django Projects (Student & Box):**
```env
SECRET_KEY=your-generated-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=mysql://user:pass@localhost/dbname
JWT_SECRET_KEY=your-jwt-secret-key
```

**ASP.NET Project (P2P):**
```env
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5235
ALLOWED_ORIGINS=http://localhost:3000
```

### Generate Secret Keys

```bash
# Django SECRET_KEY
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# JWT Secret
openssl rand -base64 32
```

## 🐳 Deployment

### Production Build Strategy

Due to cloud server resource constraints, the recommended deployment approach:

1. **Backend**: Build Docker images locally → Save as tar → Transfer → Load
2. **Frontend**: Build production bundles locally → Transfer → Extract

### Build Docker Images

```bash
# P2P Backend
cd P2P
docker build -t p2p-backend:latest .

# Student Backend
cd Student_Enroll_Grade_System
docker build -t student-backend:latest .

# Box Backend
cd box
docker build -t box-backend:latest .
```

### Build Frontend Assets

```bash
# P2P Frontend
cd P2P/p2p-client
npm run build  # Output: build/

# Student Frontend
cd Student_Enroll_Grade_System/front_end
npm run build  # Output: dist/

# Box Frontend
cd box/box_show
npm run build  # Output: build/
```

### Production Environment Variables

**Update `docker-compose.yml` before deployment:**

```yaml
environment:
  - DEBUG=False  # ⚠️ IMPORTANT: Set to False in production
  - SECRET_KEY=${DJANGO_SECRET_KEY}  # Use environment variable
  - ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Security Checklist

- [ ] Set `DEBUG=False` in all Django settings
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/TLS (update Nginx config)
- [ ] Configure CORS for specific domains only
- [ ] Set strong, unique SECRET_KEY values
- [ ] Enable rate limiting on API endpoints
- [ ] Configure proper file upload restrictions
- [ ] Set up database backups
- [ ] Review and restrict ALLOWED_HOSTS

## 📂 Project Structure

```
ONE/
├── P2P/                                    # P2P File Transfer
│   ├── P2P/                                # ASP.NET Core Backend
│   │   ├── Controllers/                    # API Controllers
│   │   ├── Hubs/                           # SignalR Hubs
│   │   ├── Models/                         # Data Models
│   │   ├── Services/                       # Business Logic
│   │   └── Program.cs                      # App Configuration
│   └── p2p-client/                         # React Frontend
│       └── src/
│           ├── components/                 # UI Components
│           ├── pages/                      # Page Components
│           └── services/                   # API Services
│
├── Student_Enroll_Grade_System/            # Student Management
│   ├── final/                              # Django Backend
│   │   ├── back/                           # App Module
│   │   │   ├── api.py                      # API Views
│   │   │   ├── models.py                   # Database Models
│   │   │   └── permission.py               # Auth & Permissions
│   │   └── final/                          # Project Settings
│   │       └── settings.py                 # Django Configuration
│   └── front_end/                          # Vue.js Frontend
│       └── src/
│           ├── api/                        # API Integration
│           ├── views/                      # Page Views
│           └── router/                     # Vue Router
│
├── box/                                    # Box Placement Visualizer
│   ├── box_back/box_back/                  # Django Backend
│   │   ├── app/                            # Main App
│   │   │   ├── views.py                    # API Endpoints
│   │   │   ├── models.py                   # Database Models
│   │   │   └── packing_algorithm.py        # Core Algorithm
│   │   └── box_back/                       # Project Settings
│   │       └── settings.py                 # Django Configuration
│   └── box_show/                           # React Frontend
│       └── src/
│           └── box/
│               ├── thr.js                  # Three.js 3D Scene
│               └── algorithm.js            # Algorithm Management
│
├── nginx/                                  # Nginx Configuration
│   └── nginx.conf                          # Reverse Proxy Config
│
├── docker-compose.yml                      # Multi-service Orchestration
├── README.md                               # This File
└── CLAUDE.md                               # Development Guidelines

```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Three.js community for excellent 3D visualization tools
- ASP.NET Core team for robust backend framework
- Django REST Framework for clean API design
- React and Vue.js teams for modern frontend frameworks

## 📸 Screenshots

> Add screenshots of your applications here to make the README more visually appealing

### P2P File Transfer
```
[Screenshot placeholder - Show the file transfer interface]
```

### Student Management Dashboard
```
[Screenshot placeholder - Show the admin dashboard]
```

### 3D Box Visualization
```
[Screenshot placeholder - Show the 3D placement view]
```

---

**Built with ❤️ using modern web technologies**
