# Web App - React with TanStack Router & Emotion

This is the web application for the NestJS Prisma project, built with modern React technologies.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router (file-based routing)
- **State Management**: TanStack Query (React Query)
- **Styling**: Emotion.js (CSS-in-JS)
- **Build Tool**: Vite
- **HTTP Client**: Axios

## Project Structure

```
apps/web/
├── src/
│   ├── components/
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utility functions and API client
│   ├── routes/          # File-based routes
│   ├── services/        # API service functions
│   ├── types/           # TypeScript type definitions
│   └── main.tsx         # Entry point
├── package.json
└── vite.config.ts
```

## Features

- **File-based Routing**: TanStack Router with automatic route generation
- **Type-safe API**: Full TypeScript integration with backend types
- **Modern Styling**: Emotion.js for performant CSS-in-JS
- **Data Fetching**: TanStack Query for caching and synchronization
- **Clean Design**: Simple, accessible UI components
- **Developer Experience**: Hot reload, TypeScript, ESLint

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm route:generate` - Generate route tree

## Available Pages

- **Home** (`/`) - Dashboard overview
- **Posts** (`/posts`) - Blog post management
- **Categories** (`/categories`) - Category management  
- **Profile** (`/profile`) - User profile
- **Login** (`/login`) - Authentication

## Configuration

### Environment Variables

Create a `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

### API Integration

The frontend connects to the NestJS backend API at `http://localhost:3000`. All API calls are handled through:

- `src/lib/api.ts` - Axios configuration with auth interceptors
- `src/services/` - Service functions for each entity (users, posts, categories)
- `src/types/` - TypeScript interfaces matching backend DTOs

## Styling Approach

Using Emotion.js for styling with:

- Styled components for reusable UI elements
- Theme-able design tokens
- CSS-in-JS with TypeScript support
- Clean, modern design without utility classes

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm exec vite
   ```

3. Open [http://localhost:5173](http://localhost:5173)

## Integration with Backend

The frontend is designed to work seamlessly with the NestJS backend:

- Authentication via JWT tokens
- Role-based access control
- Real-time data synchronization
- Type-safe API calls
- Error handling and loading states

This frontend provides a clean, modern interface for managing the blog platform with full CRUD operations for posts, categories, and user management.
