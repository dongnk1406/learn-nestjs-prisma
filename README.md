
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

## ORM

As part of our SQL learning process, every query should be implemented using both Prisma and raw SQL for comparison.

### Migration

```bash
npx prisma migrate dev --name migration_name`

npx db:generate`

db:migrate:dev`
```

## ✅ Middleware

Middleware functions can perform the following tasks:

- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.
Otherwise, the request will be left hanging.

## ✅ Validation

- Schema based validation

- Object schema validation

- Class validator

## ✅ Guard

Guards are executed after all middleware, but before any interceptor or pipe.

## ✅ Authentication

### Role-based authentication

### ✅ Refresh token

## Authorization

## Session

## Cookies

## Interceptors

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

bind extra logic before / after method execution
transform the result returned from a function
transform the exception thrown from a function
extend the basic function behavior
completely override a function depending on specific conditions (e.g., for caching purposes)

## Index DB

## File upload

<https://www.youtube.com/watch?v=8ANuWk9KWcA>

## Streaming files

## Hashing

## Techniques

<https://docs.nestjs.com/techniques/configuration>

## Security

<https://docs.nestjs.com/security/authentication>

## Microservices

<https://docs.nestjs.com/microservices/redis>

## CI/CD

## OAuth

## Caching (Redis)

## Message queue (Kafka)

## Cron jobs
