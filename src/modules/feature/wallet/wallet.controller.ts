import { Controller, Get, Post, Body, Req, UseGuards, NotFoundException, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { JwtGuard } from 'src/guards/jwt.guard';
import { TransferDTO } from './dto/create-wallet.dto';
import { UserService } from '../user/user.service';

@Controller('wallets')
export class WalletController {
  constructor(
    private readonly walletService: WalletService, 
    private http: HttpService, private userService: UserService) {}

  @Post('fund')
  @UseGuards(JwtGuard)
  async create(@Req() req: Request) {
    let wallet = await this.walletService.fund(req);
    return {
      message: 'Wallet funded successfully',
      data: wallet
    }
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async userWallet(@Req() req: Request) {

    /**
     * Get Wallet
     * 
     */
    let wallet = await this.walletService.getWallet(req.user);
    
    //
    return {
      message: 'My Wallet',
      data: wallet
    }
  }

  @Post('transfer')
  @UseGuards(JwtGuard)
  async transfer(@Body() body: TransferDTO, @Req() req: any) {

    /**
     * Get Recepient
     * 
     */
    let toUser = await this.userService.get(body.to)
    if(!toUser) {
      throw new NotFoundException('User does not exist');
    }

    if(toUser.id == req.user.id) {
      throw new BadRequestException('Operation not allowed');
    }

    if (req.user.kyc_level == 0) {
      throw new NotAcceptableException('Upload KYC to enable this operation')
    }
    
    if (req.user.kyc_level == 1 && body.amount > 1000000) {
      throw new NotAcceptableException('You can not send more than N1000000 at once.')
    }

    /**
     * Get Wallet
     * 
     */
    let toWallet = await this.walletService.getWallet(toUser.id);
    let fromWallet = await this.walletService.getWallet(req.user.id)

    /**
     * Validate
     * 
     */
    if (fromWallet.balance < body.amount) {
      throw new BadRequestException('Insuficient Balance');
    }

    /**
     * Transfer
     * 
     */
    await this.walletService.doTransfer(fromWallet, toWallet, body.amount);

    //
    return {
      message: 'Money transfered successfully',
    }
  }
}
