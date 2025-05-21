# MyQuran App

## Overview

MyQuran is a mobile-friendly Progressive Web Application (PWA) designed to help users explore the Quran, track reading progress, and earn achievements for their spiritual journey. The app features a React-based frontend with a Node.js/Express backend, using Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and TypeScript, using Vite as the build tool. It follows a component-based architecture with several key features:

- **UI Components**: Uses shadcn/ui, a collection of re-usable components built on top of Radix UI primitives
- **Routing**: Implements client-side routing with Wouter (a lightweight alternative to React Router)
- **State Management**: Uses React Query for server state management and React's Context API for local state
- **Styling**: Implements Tailwind CSS for utility-first styling with a custom theme
- **Progressive Web App**: Includes service worker for offline capabilities and installable experience

### Backend Architecture

The backend is a Node.js application using Express.js as the web framework:

- **API Layer**: RESTful API endpoints for user management, reading progress tracking, and achievements
- **Database Access**: Uses Drizzle ORM for type-safe database operations
- **Authentication**: Simple authentication system (to be expanded)
- **Static Serving**: Serves the frontend as static assets in production

### Data Storage

The application uses PostgreSQL (via Drizzle ORM) for data persistence:

- **Schema Definition**: Type-safe schema defined with Drizzle and integrated with Zod for validation
- **Tables**: Users, reading progress, streaks, and other Quran-related data
- **Migrations**: Managed through Drizzle Kit

### Authentication

The current implementation has a basic authentication system that will likely be expanded to include:

- **User Registration/Login**: API endpoints for user management
- **Session Management**: Will likely use cookies or JWT for maintaining sessions

## Key Components

1. **Quran Explorer**: Interface for browsing and reading Quran content
2. **Progress Tracking**: System to track user's reading progress and streaks
3. **Achievements System**: Gamification features to encourage consistent reading
4. **Learning Plans**: Structured content for educational purposes
5. **AI Assistant**: A virtual assistant for answering questions about the Quran
6. **Mobile-Optimized UI**: Responsive design with bottom navigation for mobile users

## Data Flow

1. **User Interaction**: User interacts with the React frontend
2. **API Requests**: Frontend makes requests to the Express backend API
3. **Data Processing**: Backend processes requests, interacts with the database via Drizzle ORM
4. **Response**: Data is returned to the frontend and displayed to the user
5. **State Management**: React Query manages cache and server state
6. **Offline Support**: Service worker caches assets and data for offline use

## External Dependencies

1. **UI Components**:
   - Radix UI for accessible primitives
   - shadcn/ui for styled components
   - Tailwind CSS for utility styling

2. **Data Handling**:
   - Drizzle ORM for database operations
   - Zod for schema validation
   - React Query for data fetching and caching

3. **External APIs**:
   - The application likely integrates with the AlQuran Cloud API for Quran content

4. **Visualization**:
   - Uses custom UI components for data visualization

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Build Process**: Vite builds the frontend into static assets
2. **Server Bundling**: esbuild bundles the server code
3. **Production Serving**: Express serves the static frontend and API endpoints
4. **Database**: Uses PostgreSQL (as indicated by the Replit configuration)
5. **Scaling**: Configured for autoscaling via Replit's deployment options

## Development Workflow

1. **Local Development**: Run with `npm run dev` for hot-reloading
2. **Database Schema Changes**: Use `npm run db:push` to update the database schema
3. **Type Checking**: Use `npm run check` to verify TypeScript types
4. **Production Build**: Use `npm run build` to create optimized production build
5. **Production Start**: Use `npm run start` to run the application in production mode