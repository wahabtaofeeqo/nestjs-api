import { Controller, Post, UsePipes, Req } from '@nestjs/common';
import { Request } from 'express';
import { ValidatorPipe } from 'src/modules/shared/pipes/validator.pipe';
import { AuthService } from './auth.service';
import { LoginSchema } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(new ValidatorPipe(LoginSchema))
  async create(@Req() req: Request) {
    let data = await this.authService.login(req.body);
    return {
      data: data,
      message: 'Login successful'
    }
  }
}
