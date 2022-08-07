import { IsNotEmpty, IsNumber } from "class-validator";

export class TransferDTO {

    @IsNotEmpty()
    to: any;

    @IsNumber()
    amount: number
}