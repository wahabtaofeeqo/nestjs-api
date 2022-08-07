import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      status: true,
      message: 'Yooooo! Welcome Nest Application API v1.'
    };
  }
}
