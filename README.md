# Backend Starter

A reusable TypeScript backend foundation for building authenticated GraphQL APIs without rebuilding the same setup from scratch.

The starter combines Express, Apollo Server, Prisma, PostgreSQL, Docker, JWT authentication, and role-based authorization in a small project that is easy to understand and extend.

## Why this starter exists

Many backend projects begin with the same work:

- Configure the server and database
- Create users and roles
- Hash passwords securely
- Issue and verify authentication tokens
- Protect routes and resolvers
- Seed development data
- Make local setup repeatable

Backend Starter handles that foundation so development can begin with the product-specific features instead.

## Included Features

- TypeScript backend application
- Express 5 server
- Apollo Server 5 GraphQL API
- PostgreSQL database
- Prisma ORM and migrations
- Docker Compose development database
- JWT-based authentication
- Password hashing with bcrypt
- Authentication context and reusable guards
- Role-based access control
- Seeded administrator account
- User and administrator GraphQL operations
- Health-check endpoint
- Production TypeScript build script

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Apollo Server 5
- GraphQL
- Prisma 7
- PostgreSQL 17
- Docker Compose
- JSON Web Tokens
- bcrypt

## Getting Started

### Prerequisites

Install the following before starting:

- Node.js
- npm
- Docker Desktop or Docker Engine with Compose

### 1. Clone the repository

```bash
git clone https://github.com/GFKolby/BackendStarter.git
cd BackendStarter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

```bash
cp .env.example .env
```

Review the values in `.env` before continuing.

### 4. Start PostgreSQL

```bash
docker compose up -d
```

The development database is exposed locally on port `5433` and connects to PostgreSQL's internal port `5432`.

### 5. Run the database migration

```bash
npm run prisma:migrate
```

### 6. Generate the Prisma client

```bash
npm run prisma:generate
```

### 7. Seed development data

```bash
npm run seed
```

The seed creates a development administrator:

```text
Email: admin@example.com
Password: admin123
```

> The seeded credentials are for local development only. Replace or remove them before using this starter in a deployed application.

### 8. Start the development server

```bash
npm run dev
```

GraphQL endpoint:

```text
http://localhost:4000/graphql
```

Health check:

```text
http://localhost:4000/health
```

## Authentication Flow

1. Submit credentials through the `login` mutation.
2. Receive a signed JWT and user information.
3. Send the token in the `Authorization` header.
4. The authentication context resolves the current user.
5. Guards enforce member, manager, or administrator permissions where required.

Use this header format:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

## Example GraphQL Operations

### Log in

```graphql
mutation {
  login(
    input: {
      email: "admin@example.com"
      password: "admin123"
    }
  ) {
    token
    user {
      id
      email
      name
      role
    }
  }
}
```

### Fetch the current user

Add the JWT to the authorization header first.

```graphql
query {
  me {
    id
    email
    name
    role
    isActive
  }
}
```

### Fetch users as an administrator

```graphql
query {
  users {
    id
    email
    name
    role
    isActive
    createdAt
    updatedAt
  }
}
```

## Roles

The starter includes the following example roles:

- `USER`
- `ADMIN`
- `MANAGER`
- `MEMBER`

These are starting points and can be renamed or expanded for the needs of a specific application.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run seed
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

## Project Structure

```text
BackendStarter/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── auth/
│   │   ├── auth.context.ts
│   │   ├── auth.guard.ts
│   │   ├── auth.service.ts
│   │   └── auth.types.ts
│   ├── generated/
│   │   └── prisma/
│   ├── graphql/
│   │   └── schema.ts
│   ├── modules/
│   │   └── user/
│   │       └── user.graphql.ts
│   ├── prisma/
│   │   └── prisma.client.ts
│   └── server.ts
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Extending the Starter

A new feature can follow the existing modular structure:

1. Add or update Prisma models.
2. Create a module with GraphQL type definitions and resolvers.
3. Apply authentication or role guards.
4. Register the module in the root GraphQL schema.
5. Add seed data where useful.

Common next additions include refresh tokens, email verification, password resets, automated tests, rate limiting, logging, and deployment configuration.

## Current Status

The starter provides a working local backend foundation and is intended as a base for continued development. It is not presented as a fully hardened production framework; deployed applications should add application-specific validation, testing, security controls, observability, and deployment configuration.

## Author

Built by [Kolby Kinsey](https://github.com/GFKolby) as a reusable foundation for APIs, SaaS products, and client backend projects.
