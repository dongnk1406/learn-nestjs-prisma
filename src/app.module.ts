import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './modules/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/auth/guards/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/task-scheduler/task.module';
import { LoggerModule } from 'nestjs-pino';
import { PostModule } from './modules/post/post.module';
import { HealthCheckModule } from './common/health-check/health-check.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    CommentModule,
    HealthCheckModule,
    TasksModule,
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'nestjs-app',
        level: process.env.APP_ENV === 'prod' ? 'info' : 'debug',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'debug',
            },
          ],
        },
      },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
