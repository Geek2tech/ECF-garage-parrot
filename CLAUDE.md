# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garage Vincent Parrot - A full-stack web application for an automobile repair and used car sales business. This is a monorepo with separate BackEnd (Node.js/Express) and FrontEnd (Nuxt 3) applications.

**Production URL:** https://www.vparrot.fr

## Commands

### Backend (from `BackEnd/` directory)
```bash
npm install                    # Install dependencies
node server.js                 # Start server
nodemon server.js              # Start with auto-restart (recommended for dev)
```

### Frontend (from `FrontEnd/` directory)
```bash
npm install                    # Install dependencies
npm run dev                    # Development server (http://localhost:3000)
npm run build                  # Production build
npm run preview                # Preview production build
```

### Database (from root)
```bash
docker-compose up -d           # Start MariaDB container (port 3306)
```

### Database Setup
1. Run `BackEnd/Databases/database_parrot.sql` (requires admin privileges for triggers)
2. Optionally run `BackEnd/Databases/fixtures.sql` for test data

## Architecture

```
ECF-garage-parrot/
├── BackEnd/                   # Node.js/Express REST API
│   ├── src/
│   │   ├── controller/        # Business logic (Auth, Car, User, Services, Comment, Mail, etc.)
│   │   ├── routes/            # Express route handlers
│   │   ├── middleware/        # Auth, API key validation, file upload (multer)
│   │   ├── services/          # DB connection, Logger (Winston), Mail transport
│   │   └── helpers/           # Utilities (field validation, MSM integration, pagination)
│   ├── Databases/             # SQL schemas and fixtures
│   └── server.js              # Entry point
├── FrontEnd/                  # Nuxt 3 SPA
│   ├── pages/                 # Route components (index, login, admin/, occasions/)
│   ├── components/            # Vue components (admin/, Header, Footer, Cars, etc.)
│   ├── stores/                # Pinia state management
│   ├── middleware/            # Route protection (auth.js)
│   └── nuxt.config.ts         # Nuxt configuration
└── compose.yml                # Docker Compose for MariaDB
```

## API Authentication

- **API Key:** All requests require `x-api-key` header matching `APP_APIKEY`
- **JWT:** Protected routes require `Authorization: Bearer <token>` header
- **Role-based access:** profil_id determines permissions (1=admin, 2=employee)

### Route Patterns
- Public routes: `/api/cars`, `/api/services`, `/api/opening`, `/api/comments` (POST)
- Protected routes: `/api/protected/*` (require JWT)
- Photos: `/photo/:filename` (public, no auth)

## Environment Variables

### Backend `.env`
```
APP_PORT=8081
APP_APIKEY=<secret>
APP_SECRET_KEY=<jwt-secret>
NODE_ENV=dev|production
APP_URL=http://localhost:8081
APP_AUTHORIZED_URL1=http://localhost:3000
APP_DBHOST=localhost
APP_DBUSER=<user>
APP_DBPASSWORD=<pass>
APP_DB=dbvparrot
APP_MSM_URL=<msm-api-url>
APP_MSM_APIKEY=<key>
APP_MSM_FRONT_URL=http://localhost:3000/password
APP_MSM_VALIDITY=30
APP_MSM_PASSWORD=<password>
APP_MSM_FROM=<email>
APP_MSM_MAXOPEN=3
```

### Frontend `.env`
```
APP_APIKEY=<must-match-backend>
APP_BACKEND_URL=http://localhost:8081
APP_GARAGE_MAIL=<notification-email>
APP_MSM_URL=<msm-api-url>
```

## Key Patterns

- **Logging:** Use Winston logger (`BackEnd/src/services/Logger.js`) instead of console.log
- **Input validation:** Use `fieldControl.js` helpers for sanitization
- **Password delivery:** MSM (MySecretMessage) integration for secure temporary passwords
- **File uploads:** Multer middleware handles car photos
- **Frontend auth:** JWT stored in sessionStorage, verified via `plugins/jwt.js`

## Database

- **Type:** MariaDB (MySQL compatible)
- **Key tables:** users, profiles, cars, services, comments, equipments, opening_hours
- **Triggers:** Audit/automation triggers exist (require admin to create)

## User Roles

- **Anonymous:** View cars/services/hours, submit comments (pending moderation), contact garage
- **Employee (profil_id=2):** Manage cars, moderate comments
- **Administrator (profil_id=1):** Full control (users, services, hours) + employee permissions
