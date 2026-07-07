# Goodfolk Backend Starter

A simple backend starter using:

- Node.js
- TypeScript
- Express
- Apollo GraphQL
- Prisma
- PostgreSQL
- Docker
- JWT Auth
- Role-based access control

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Copy environment variables

```bash
cp .env.example .env
```

### 3. Start Postgres

```bash
docker compose up -d
```

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Seed the database

```bash
npm run seed
```

Default admin:

```txt
email: admin@example.com
password: admin123
```

### 7. Start dev server

```bash
npm run dev
```

GraphQL endpoint:

```txt
http://localhost:4000/graphql
```

Health check:

```txt
http://localhost:4000/health
```

## Auth Header

Use this format:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

## Useful Scripts

```bash
npm run dev
npm run seed
npm run build
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

## Project Structure

```txt
src/
  auth/
    auth.context.ts
    auth.guard.ts
    auth.service.ts
    auth.types.ts
  generated/
    prisma/
  graphql/
    schema.ts
  modules/
    user/
      user.graphql.ts
  prisma/
    prisma.client.ts
  server.ts

prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Test Queries

### Login

```graphql
mutation {
  login(input: {
    email: "admin@example.com"
    password: "admin123"
  }) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### Current User

Add your token to the Authorization header first.

```graphql
query {
  me {
    id
    email
    role
  }
}
```

### Admin Users Query

Requires an admin token.

```graphql
query {
  users {
    id
    email
    name
    role
    isActive
  }
}
```