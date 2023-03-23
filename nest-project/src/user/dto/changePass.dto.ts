import {IsNotEmpty,IsString, MinLength} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class changePasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    oldPassword: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    repeatPassword: string
}