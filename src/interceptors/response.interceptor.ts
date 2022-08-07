import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let response: Response = context.switchToHttp().getResponse<Response>()
    if ([200, 201].includes(response.statusCode)) {
      return next.handle().pipe(map(data => {
        let {message, ...res} = data;
        return {
          status: true,
          message: data?.message,
          data: res?.data
        }
      }))
    }
    return next.handle();
  }
}
