import {IsNotEmpty,IsEmail,IsString, MinLength} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    surname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message:"Please enter correct email" })
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}