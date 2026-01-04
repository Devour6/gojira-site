# Gojira Holdings

## Overview

Gojira Holdings is a Web3 infrastructure company website built with React and Express. The application showcases a Solana validator service ("King of the Nodes") and displays the company's investment portfolio. Key features include live staking statistics, validator metrics, and a portfolio showcase of blockchain investments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with custom dark theme (Gojira brand colors)
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Location**: `shared/schema.ts` contains all database table definitions

### Data Flow
- Frontend fetches data via custom hooks in `client/src/hooks/use-data.ts`
- API routes are defined in `server/routes.ts` and follow the contract in `shared/routes.ts`
- Mock data is currently used for validator/staking stats (designed for future Solana RPC integration)

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components (shadcn + custom)
    pages/        # Route pages (Home, Validator)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API endpoint definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared between client/server
  schema.ts       # Drizzle database schema
  routes.ts       # API contract definitions with Zod
```

### Key Design Patterns
- **Shared Types**: TypeScript types are shared between frontend and backend via `shared/` directory
- **API Contract**: Routes and response schemas defined once in `shared/routes.ts`, used by both sides
- **Storage Interface**: `IStorage` interface in `server/storage.ts` abstracts database operations

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and queries
- **Drizzle Kit**: Database migrations (`npm run db:push`)

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animations
- **wouter**: Client-side routing
- **shadcn/ui + Radix UI**: Component primitives
- **Tailwind CSS**: Utility-first styling

### Backend Libraries
- **express**: HTTP server
- **drizzle-orm**: Database ORM
- **zod**: Schema validation
- **connect-pg-simple**: PostgreSQL session store (available but auth not implemented)

### Future Integrations (Planned)
- Solana RPC endpoints for live validator data
- Price API for SOL/USD conversion
- Wallet connection for staking functionality