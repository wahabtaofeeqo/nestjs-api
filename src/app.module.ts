import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AuthModule } from './modules/feature/auth/auth.module';
import { models } from './modules/feature/models';
import { UserModule } from './modules/feature/user/user.module';
import { WalletModule } from './modules/feature/wallet/wallet.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    WalletModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: models,
      subscribers: [],
      migrations: ['./database/migrations'],
      autoLoadEntities: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class AppModule {}
