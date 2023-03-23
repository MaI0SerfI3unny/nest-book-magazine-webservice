import {IsNotEmpty,IsString, MinLength} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class changeAvatarUser {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    photo: string
}