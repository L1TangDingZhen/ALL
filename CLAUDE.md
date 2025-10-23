# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-project repository containing three main applications:

1. **P2P File Transfer** - A peer-to-peer file transfer application with ASP.NET Core backend and React frontend
2. **Student Enrollment & Grade System** - A course management system with Django backend and Vue.js frontend  
3. **Box Placement System** - A 3D box packing visualization tool with Django backend and React frontend

## Project Structure

```
ONE/
├── P2P/                          # P2P File Transfer Application
│   ├── P2P/                      # ASP.NET Core backend (.NET 8)
│   │   ├── Controllers/          # API controllers
│   │   ├── Hubs/                 # SignalR real-time communication
│   │   ├── Models/               # Data models
│   │   └── Services/             # Business logic
│   └── p2p-client/               # React frontend
│       └── src/
│           ├── components/       # UI components
│           ├── pages/            # Application pages
│           └── services/         # Service layer
├── Student_Enroll_Grade_System/  # Student Management System
│   ├── final/                    # Django backend
│   └── front_end/                # Vue.js frontend
├── box/                          # Box Placement System
│   ├── box_back/                 # Django backend
│   └── box_show/                 # React frontend with Three.js
└── docker-compose.yml            # Unified deployment configuration
```

## Development Commands

### P2P File Transfer System

**Backend (ASP.NET Core):**
```bash
cd P2P/P2P
dotnet run                        # Run development server (http://localhost:5235)
dotnet build                      # Build the project
```

**Frontend (React):**
```bash
cd P2P/p2p-client
npm install                       # Install dependencies
npm start                         # Run development server (http://localhost:3000)
npm run build                     # Build for production
npm test                          # Run tests
```

### Student Enrollment System

**Backend (Django):**
```bash
cd Student_Enroll_Grade_System/final
pip install -r requirements.txt   # Install dependencies
python manage.py runserver        # Run development server
python manage.py migrate          # Apply database migrations
```

**Frontend (Vue.js):**
```bash
cd Student_Enroll_Grade_System/front_end
npm install                       # Install dependencies
npm run dev                       # Run development server
npm run build                     # Build for production
npm run lint                      # Run linter
```

### Box Placement System

**Backend (Django):**
```bash
cd box/box_back/box_back
pip install -r requirements.txt   # Install dependencies
python manage.py runserver        # Run development server
```

**Frontend (React):**
```bash
cd box/box_show
npm install                       # Install dependencies
npm start                         # Run development server
npm run build                     # Build for production
npm test                          # Run tests
```

### Docker Deployment

**Individual Project Deployment:**
```bash
# P2P System
cd P2P
docker-compose up -d

# Box System
cd box
docker-compose up -d
```

**Unified Deployment (All Projects):**
```bash
# From repository root
docker-compose up -d              # Deploy all three applications with nginx
docker-compose ps                 # Check service status
docker-compose logs -f            # View logs
```

## Production Deployment Strategy

**IMPORTANT**: Due to cloud server performance limitations, the deployment strategy is:
- **Backend**: Build Docker images locally → Save as tar archives → Transfer to cloud server → Load directly
- **Frontend**: Build production bundles locally → Package as compressed archives → Transfer to cloud server → Extract and serve

This avoids resource-intensive builds on the cloud server.

## Architecture Overview

### P2P File Transfer System
- **Backend**: ASP.NET Core with SignalR for real-time communication
- **Frontend**: React with Bootstrap and SignalR client
- **Key Features**: WebRTC peer-to-peer connections, invitation-based authentication, file transfer with chunking
- **Communication**: REST API + SignalR Hub at `/p2phub`
- **Port Configuration**: Backend runs on 5235, frontend on 3000 (development)

### Student Enrollment System  
- **Backend**: Django with Django REST Framework and JWT authentication
- **Frontend**: Vue.js with Element Plus UI library and TypeScript
- **Database**: MySQL
- **Key Features**: Role-based access control, course management, enrollment tracking, grade management

### Box Placement System
- **Backend**: Django with custom packing algorithms
- **Frontend**: React with Three.js for 3D visualization and Material-UI
- **Key Features**: 3D box packing visualization, algorithm optimization, interactive 3D rendering

## Key Configuration Files

- **P2P System**: `P2P/Program.cs` (backend configuration), `p2p-client/package.json` (frontend dependencies)
- **Student System**: `final/settings.py` (Django settings), `front_end/vite.config.ts` (Vite configuration)  
- **Box System**: `box_back/settings.py` (Django settings), `box_show/package.json` (React configuration)
- **Deployment**: Root-level `docker-compose.yml` for unified deployment, individual `docker-compose.yml` files per project

## Common Development Patterns

- All React frontends use Create React App or Vite build systems
- Django backends follow REST API patterns with Django REST Framework
- SignalR is used for real-time communication in the P2P system
- Docker containerization is available for all components
- Nginx is used as reverse proxy in production deployments