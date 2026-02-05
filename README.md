# Learn NestJS Prisma - Monorepo

A full-stack application demonstrating modern development practices with NestJS backend, React web frontend, and prepared structure for Expo mobile app.

## Project Structure

```
learn-nestjs-prisma/
├── apps/
│   ├── web/                 # React web application (moved from frontend/)
│   └── mobile/              # Future Expo mobile app
├── service/                 # NestJS backend API
├── packages/               # Shared libraries (future)
└── assets/                 # Shared assets
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL

### Installation

```bash
# Install all dependencies
pnpm install

# Set up database
pnpm db:migrate:dev
pnpm db:seed
```

### Development

```bash
# Start backend only
pnpm service:dev

# Start web app only  
pnpm web:dev

# Start both simultaneously
pnpm dev:all
```

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:service
pnpm build:web
```

## Apps

### Web App (`apps/web/`)

- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router
- **State**: TanStack Query
- **Styling**: Emotion.js
- **Build**: Vite

### Mobile App (`apps/mobile/`)

Ready for Expo setup:

```bash
cd apps/mobile
npx create-expo-app@latest . --template tabs
```

### Backend (`service/`)

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma
- **Auth**: JWT with RBAC
- **Features**: Users, Posts, Comments, Categories, Roles, Permissions

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm service:dev` | Start backend in development mode |
| `pnpm web:dev` | Start web app in development mode |
| `pnpm dev:all` | Start both backend and web app |
| `pnpm build` | Build all applications |
| `pnpm db:migrate:dev` | Run database migrations |
| `pnpm db:seed` | Seed database with initial data |
| `pnpm lint` | Lint all projects |
| `pnpm test` | Run tests for all projects |
