import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycDTO } from './dto/create-user.dto';
import { KYC } from './entities/kyc.entity';

@Injectable()
export class KycService {
    constructor(@InjectRepository(KYC) private repository: Repository<KYC>) {}

    upload(dto: KycDTO) {
        return this.repository.save(dto);
    }

    getUserKYCs(user: any) {
        return this.repository.find({where: {user}})
    }
}
