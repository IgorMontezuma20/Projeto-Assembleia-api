import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Assembleia API')
    .setDescription('Api do projeto Assembleia.')
    .setVersion('1.0.0')
    .setContact(
      'Igor Montezuma de Miranda',
      'https://www.linkedin.com/in/igor-montezuma/',
      'igorminranda17@gmail.com',
    )
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(3000);
}
bootstrap();
