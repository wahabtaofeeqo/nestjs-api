import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Prefix
   */
  app.setGlobalPrefix(process.env.API_PREFIX);

  /**
   * Global Validator
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Exception
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  //
  await app.listen(3000);
}
bootstrap();
