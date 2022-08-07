import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {

  constructor(@InjectRepository(Wallet) private readonly repository: Repository<Wallet>) {}

  create(user: User) {
    return this.repository.save(new Wallet(user))
  }

  getWallet(user: any) {
    return this.repository.findOneBy({user})
  }

  async fund(req: any) {
    let wallet = await this.repository.findOneBy({user: req.user})
    wallet.balance += req.body.amount;
    return await this.repository.update({id: wallet.id}, wallet);
  }

  async doTransfer(from: Wallet, to: Wallet, amount: number) {
   
    /**
     * Credit the Recipient
     * 
     */
    let balance = to.balance + amount;
    await this.repository.update({id: to.id}, {balance});

    /**
     * Debit the sender
     * 
     */
    balance = from.balance - amount;
    await this.repository.update({id: from.id}, {balance});
  }
}
