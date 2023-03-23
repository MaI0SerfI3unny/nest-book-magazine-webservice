import {IsNotEmpty,IsEmail,IsString, MinLength} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
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