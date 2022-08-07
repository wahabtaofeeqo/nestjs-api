import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WalletModule } from '../wallet/wallet.module';
import { KycService } from './kyc.service';
import { KYC } from './entities/kyc.entity';

@Module({
  imports: [
    WalletModule,
    TypeOrmModule.forFeature([User, KYC])
  ],
  controllers: [UserController],
  providers: [UserService, KycService],
  exports: [UserService]
})
export class UserModule {}
