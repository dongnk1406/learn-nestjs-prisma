
# Learn Nestjs REST API

## Project setup

```bash
npm install
```

## Compile and run the project

```bash
# init DB
$ docker compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Access: <http://localhost:3000>

Swagger <http://localhost:3000/api>

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Jenkins và Github Action

[deployment documentation](https://www.youtube.com/watch?v=Gpl_usE_BWM)

## Migration

`npx prisma migrate dev --name migration_name`

Every time you run migration, we need to run `npx prisma generate` as well

## Middleware

Middleware functions can perform the following tasks:

- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.
Otherwise, the request will be left hanging.

## Validation

- Schema based validation

- Object schema validation

- Class validator

## Guard

Guards are executed after all middleware, but before any interceptor or pipe.

## Authentication

### Role-based authentication

### Refresh token

## Authorization

## Interceptors

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

bind extra logic before / after method execution
transform the result returned from a function
transform the exception thrown from a function
extend the basic function behavior
completely override a function depending on specific conditions (e.g., for caching purposes)

## File upload

## Hashing

## Techniques

<https://docs.nestjs.com/techniques/configuration>

## Security

<https://docs.nestjs.com/security/authentication>

## Microservices

<https://docs.nestjs.com/microservices/redis>

## CI/CD

## OAuth

## Redis

## Kafka

## Task Management System

### 📦 Phase 1: Setup and Basic Structure

| Task | Technology / Concept | Goal |
|------|----------------------|------|
| 1.1 | `nestjs/cli` | Initialize the NestJS project, set up a standard structure, and install necessary dependencies |
| 1.2 | Prisma / Postgres | Configure the database module and create a `.env` file to manage the connection string |
| 1.3 | `nest g module user` | Create the first module to handle user management logic |
| 1.4 | `User.entity.ts` | Define fields such as `id`, `username`, `password`, and `salt` (or equivalent) |

### 🔐 Phase 2: Authentication & Authorization

| Task | Technology / Concept | Goal |
|------|----------------------|------|
| 2.1 | `nest g module auth` | Create the Auth module containing all login/signup logic |
| 2.2 | `bcrypt` | Implement password hashing before saving to the DB and comparison during login |
| 2.3 | `AuthService Pattern` | Build business logic: `signUp(dto)`, `signIn(dto)` |
| 2.4 | `@nestjs/jwt`, `Passport.js` | Set up JWT: create secret key and configure `JwtModule` in `AuthModule` |
| 2.5 | `JwtStrategy` | Define how NestJS extracts and verifies JWT from request headers |
| 2.6 | `AuthGuard()` | Apply guard to protect API routes using `@UseGuards(AuthGuard())` |
| 2.7 | `AuthController Pattern` | Create endpoints: `/auth/signup` and `/auth/signin` |
| 2.8 | `@nestjs/common/Pipes`, `class-validator` | Add validation pipes to check input data (DTO) for signup/login |

### 📋 Phase 3: Task Management Module

| Task | Technology / Concept | Goal |
|------|----------------------|------|
| 3.1 | `nest g module task` | Create the module for task management logic |
| 3.2 | TypeORM / Mongoose | Define the `Task` entity/schema with fields: `title`, `description`, `status`, `userId` |
| 3.3 | One-to-Many | Establish DB relationship: link `User (1)` to `Task (N)` |
| 3.4 | Service & Controller | Implement CRUD APIs: `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id` |
| 3.5 | `AuthGuard` | Protect APIs so only logged-in users can access them |
| 3.6 | Custom Decorator | Apply ownership logic: ensure tasks belong to the currently logged-in user when creating/viewing/editing/deleting |

### 🚀 Phase 4: Advanced Features (Optional)

- **4.1**: Pagination and Filtering (`GET /tasks?status=...&page=...`)
- **4.2**: Real-time Notifications (`WebSockets` / `Socket.io`)
- **4.3**: Logging Implementation (`Winston`)
