# SkillUp Backend - Setup Guide

This backend is structured as a monorepo using Bun/Turborepo.

## Structure
- `apps/api`: REST API (Express + TypeScript)
- `apps/liveContest`: WebSocket Server (ws + Redis)
- `packages/database`: Shared Prisma ORM

## Environment Variables
Create a `.env` file in the root with the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillup"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your_jwt_secret_here"
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
WS_PORT=8080
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Database Setup**:
   ```bash
   bun run db:generate
   bun run db:push
   ```

3. **Running in Development**:
   - Start REST API: `bun run dev:api`
   - Start WebSocket Server: `bun run dev:live`

4. **Build**:
   ```bash
   bun run build
   ```

## API Endpoints
- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login
- `GET /api/contests`: List all contests
- `POST /api/contests`: Create a contest (Admin only)
- `POST /api/contests/ai-gen`: Generate AI questions (Admin only)

## WebSocket Events
Connect to `ws://localhost:8080?token=<JWT>&contestId=<ID>`
- `SUBMIT_ANSWER`: Submit an MCQ response
- `LEADERBOARD_UPDATE`: (Server -> Client) Real-time score updates
