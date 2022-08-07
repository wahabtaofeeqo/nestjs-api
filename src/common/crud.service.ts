import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CrudService {

    private model: any;

    constructor(model: any) {
        this.model = model
    }
}
