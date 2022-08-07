import { IsIn, IsNotEmpty, IsString, isString, Min } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class KycDTO {

    @IsNotEmpty()
    @IsIn(['BVN', 'NIN', 'CACID'])
    type: string

    @IsNotEmpty()
    document: string

    user: any;
}