import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { RolesGuard } from './auth/guards/roles.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Learn NestJS Prisma API')
    .setDescription('My first NestJS Prisma API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
