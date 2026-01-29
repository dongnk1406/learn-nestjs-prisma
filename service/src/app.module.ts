import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './modules/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/auth/guards/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/task-scheduler/task.module';
import { LoggerModule } from 'nestjs-pino';
import { PostModule } from './modules/post/post.module';
import { HealthCheckModule } from './common/health-check/health-check.module';
import { RolesGuard } from './common/auth/guards/roles.guard';

@Module({
  imports: [
    UserModule,
    PostModule,
    CategoryModule,
    CommentModule,
    RoleModule,
    PermissionModule,
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
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
