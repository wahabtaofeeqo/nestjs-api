import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, KycDTO } from './dto/create-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { WalletService } from '../wallet/wallet.service';
import { Request } from 'express';
import { KycService } from './kyc.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private walletService: WalletService, private kycService: KycService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    /**
     * Create Account 
     */
    let user = await this.userService.create(createUserDto);

    /**
     * Create Wallet
     */
    await this.walletService.create(user);

   //
    return {
      message: 'User created successfully',
      data: user
    };
  }

  @Get('wallet')
  @UseGuards(JwtGuard)
  async wallet(@Req() req) {
    let wallet = await this.walletService.getWallet(req.user);
    return {
      message: 'User Wallet',
      data: wallet
    }
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async profile(@Req() req) {
    let profile = await this.userService.profile(req.user.id);
    return {
      message: 'User profile',
      data: profile
    }
  }

  @Post('kycs')
  @UseGuards(JwtGuard)
  async uploadKyc(@Body() body: KycDTO, @Req() req: any) {

    body.user = req.user;
    await this.kycService.upload(body);

    /**
     * Increase User KCY level
     * 
     */
    let level = 0;
    switch (body.type.toLocaleLowerCase()) {
      case 'bvn':
        level = 1;
        break;

      case 'nin':
        level = 2;
        break;
    
      case 'cacid':
        level = 3;
        break;
    }

    /** 
     * Check if need to incease
     * 
    */
    if (req.user.kyc_level < level) {
      await this.userService.update(req.user, {kyc_level: level});
    }

    // 
    return {
      message: 'KYC uploaded'
    }
  } 
}
