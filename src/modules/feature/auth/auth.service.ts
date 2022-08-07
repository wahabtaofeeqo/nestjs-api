import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly service: UserService, private jwt: JwtService) {}

  async login(req: any) {
    let user = await this.service.findBy({username: req.username})
    if(user) {
      let isValid = await bcrypt.compare(req.password, user.password);
      if (isValid) {
        let token = this.jwt.sign({
          id: user.id,
          username: user.username,
        });

        let {password, ...result} = user;
        return {
          token,
          user: result
        }
      }
    }

    throw new NotFoundException('Username OR Password not correct')
  }
}
