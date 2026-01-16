
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
$ npm run db:migrate:dev

$ npm run db:generate

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

PM2 keeps your Node app running, restarts it if it crashes, and helps manage multiple processes.

```bash
npm install -g pm2
npm run build
pm2 start dist/main.js --name process-name
```

### 🚀 What PM2 can do

1. Keep your app alive

* If your app crashes, PM2 automatically restarts it

2. Cluster mode (use all CPU cores)

```bash
pm2 start dist/main.js -i max
```

```bash
pm2 start ecosystem.config.js
```

* Runs multiple Node processes
* Load-balances across CPU cores

3. Zero-downtime reloads

```bash
pm2 reload app
```

* Reload without dropping requests

4. Logging

```bash
pm2 logs
```

* Centralized stdout / stderr logs

5. Monitoring

```bash
pm2 monit
```

* CPU
* Memory
* Restart count

### When PM2 *does* make sense

| Scenario                      | Use PM2? |
| ----------------------------- | -------- |
| Bare metal / VM               | ✅        |
| EC2 without Docker            | ✅        |
| Docker + K8s / ECS            | ❌        |
| Simple VPS (no orchestration) | ✅        |

## Jenkins và Github Action

[deployment documentation](https://www.youtube.com/watch?v=Gpl_usE_BWM)

## ORM

As part of our SQL learning process, every query should be implemented using both Prisma and raw SQL for comparison.

### Migration

```bash
npx prisma migrate dev --name migration_name`

npm run db:generate`

npm run db:migrate:dev`

npm run db:seed`
```

## ✅ Middleware

Middleware functions can perform the following tasks:

* execute any code.
* make changes to the request and the response objects.
* end the request-response cycle.
* call the next middleware function in the stack.
* if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.
Otherwise, the request will be left hanging.

## ✅ Validation

* Schema based validation

* Object schema validation

* Class validator

## ✅ Guard

Guards are executed after all middleware, but before any interceptor or pipe.

## ✅ Authentication

### Role-based authentication

### ✅ Refresh token

## Authorization

## Session

## Cookies

## Pipe

In NestJS, Pipes are classes used to intercept and process incoming data within the request lifecycle. Their primary functions are transformation (converting data to a desired format, e.g., string to integer) and validation (ensuring data meets specific criteria and throwing exceptions if it doesn't).

## ✅ Interceptors

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

bind extra logic before / after method execution
transform the result returned from a function
transform the exception thrown from a function
extend the basic function behavior
completely override a function depending on specific conditions (e.g., for caching purposes)

## Index DB

## Inversion of control (IoC)

<https://www.youtube.com/watch?v=8EhoEu_kYPU&list=PLw0w5s5b9NK7HkcQUBIxjcHPB2DS4UKDg&index=46>

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

## Elasticsearch

## CQRS

## Load balancing

## Metrics & Monitoring

## Race Condition

Với race conditions, luôn phải tạo constraint và trigger cũng như sử dụng transaction.transaction

Trong nestjs, sử dụng [Sequelize transactions](https://docs.nestjs.com/techniques/database#sequelize-transactions)

## Structure of Project

In this project I used a mix of [clean architecture](https://jasontaylor.dev/clean-architecture-getting-started/), [vertical slice architecture](https://jimmybogard.com/vertical-slice-architecture/) and I used [feature folder structure](http://www.kamilgrzybek.com/design/feature-folders/) to structure my files.

Each microservice has its dependencies such as databases, files etc. Each microservice is decoupled from other microservices and developed and deployed separately. Microservices talk to each other with Rest or gRPC for synchronous calls and use RabbitMq or Kafka for asynchronous calls.

We have a separate microservice `Identity` for authentication and authorization of each request. Once signed-in users are issued a JWT token. This token is used by other microservices to validate the user, read claims and allow access to authorized/role specific endpoints.

I used [RabbitMQ](https://github.com/rabbitmq) as my MessageBroker for async communication between microservices using the eventual consistency mechanism. Each microservice uses [amqp](https://github.com/amqp-node/amqplib) to interface with [RabbitMQ](https://github.com/rabbitmq) providing, messaging, availability, reliability, etc.

Microservices are `event based` which means they can publish and/or subscribe to any events occurring in the setup. By using this approach for communicating between services, each microservice does not need to know about the other services or handle errors occurred in other microservices.

I treat each request as a distinct use case or slice, encapsulating and grouping all concerns from front-end to back.
When adding or changing a feature in an application in n-tire architecture, we are typically touching many "layers" in an application. We are changing the user interface, adding fields to models, modifying validation, and so on. Instead of coupling across a layer, we couple vertically along a slice. We `minimize coupling` `between slices`, and `maximize coupling` `in a slice`.

With this approach, each of our vertical slices can decide for itself how to best fulfill the request. New features only add code, we're not changing shared code and worrying about side effects.

<div align="center">
  <img src="./assets/vertical-slice-architecture.png" />
</div>

Instead of grouping related action methods in one controller, as found in traditional ASP.net controllers, I used the [REPR pattern](https://deviq.com/design-patterns/repr-design-pattern). Each action gets its own small endpoint, consisting of a route, the action, and an `IMediator` instance (see [MediatR](https://github.com/jbogard/MediatR)). The request is passed to the `IMediator` instance, routed through a [`Mediatr pipeline`](https://lostechies.com/jimmybogard/2014/09/09/tackling-cross-cutting-concerns-with-a-mediator-pipeline/) where custom [middleware](https://github.com/jbogard/MediatR/wiki/Behaviors) can log, validate and intercept requests. The request is then handled by a request specific `IRequestHandler` which performs business logic before returning the result.

The use of the [mediator pattern](https://dotnetcoretutorials.com/2019/04/30/the-mediator-pattern-in-net-core-part-1-whats-a-mediator/) in my controllers creates clean and [thin controllers](https://codeopinion.com/thin-controllers-cqrs-mediatr/). By separating action logic into individual handlers we support the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) and [Don't Repeat Yourself principles](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), this is because traditional controllers tend to become bloated with large action methods and several injected `Services` only being used by a few methods.

I used CQRS to decompose my features into small parts that makes our application:

* Maximize performance, scalability and simplicity.
* Easy to maintain and add features to. Changes only affect one command or query, avoiding breaking changes or creating side effects.
* It gives us better separation of concerns and cross-cutting concern (with help of mediatr behavior pipelines), instead of bloated service classes doing many things.

Using the CQRS pattern, we cut each business functionality into vertical slices, for each of these slices we group classes (see [technical folders structure](http://www.kamilgrzybek.com/design/feature-folders)) specific to that feature together (command, handlers, infrastructure, repository, controllers, etc). In our CQRS pattern each command/query handler is a separate slice. This is where you can reduce coupling between layers. Each handler can be a separated code unit, even copy/pasted. Thanks to that, we can tune down the specific method to not follow general conventions (e.g. use custom SQL query or even different storage). In a traditional layered architecture, when we change the core generic mechanism in one layer, it can impact all methods.

## Aspect Oriented Programming (AOP)

Aspect Oriented Programming (AOP) – lập trình hướng khía cạnh: là một kỹ thuật lập trình (kiểu như lập trình hướng đối tượng) nhằm phân tách chương trình thành cách moudule riêng rẽ, phân biệt, không phụ thuộc nhau.

![alt text](assets/aop.png)

## NPM tips

<https://www.youtube.com/watch?v=N5DUT6QNwkM>

## Nest CLI

<https://www.schemastore.org/nest-cli.json>

## Provider

* Provider in Nestjs is Bean in java
