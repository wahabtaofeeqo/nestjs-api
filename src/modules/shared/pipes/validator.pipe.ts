import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidatorPipe implements PipeTransform {

  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const {error} = this.schema.validate(value);
    if(error) {
      const messages = error.details.map((d) => d.message).join()
      throw new BadRequestException(messages);
    }

    return value;
  }
}
