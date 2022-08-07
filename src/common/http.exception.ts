import { ExceptionFilter, HttpStatus, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {


  catch(exception: Error, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException 
        ? exception.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //
    const responseBody = {
        status: false,
        message: exception.message
    }

    /**
     * Validation Error
     * 
     */
    if(exception instanceof BadRequestException) {
      const body: any = exception.getResponse();
      responseBody.message = body?.error || 'Validation Error'
      Object.assign(responseBody, {error: body?.message});
    }

    response.status(status).json(responseBody);
  }
}