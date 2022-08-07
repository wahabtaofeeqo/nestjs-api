import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, KycDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import bcrypt from "bcrypt";
import { KycService } from './kyc.service';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repository: Repository<User>, private kycService: KycService) {}
  
  async create(dto: CreateUserDto) {
    let payload = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    }
    
    return this.repository.save(payload);
  }

  findAll() {
    return `This action returns all user`;
  }

  get(id: any) {
    return this.repository.findOne({
      where: [
        { id },
        {username: id}
      ],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({id})
  }

  findBy(options: any) {
    return this.repository.findOneBy(options);
  }

  profile(user: any) {
    let profile = this.repository.findOne({
      where: {
        id: user
      },
      relations: {
        wallet: true
      }
    });

    return profile;
  }

  update(user: any, data: any) {
    return this.repository.update({id: user.id}, data);
  }
}
