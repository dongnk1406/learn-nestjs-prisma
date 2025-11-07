import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/auth.guard';
import { HealthCheckModule } from './health-check/health-check.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './task-scheduler/task.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    HealthCheckModule,
    TasksModule,
    ScheduleModule.forRoot(),
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
