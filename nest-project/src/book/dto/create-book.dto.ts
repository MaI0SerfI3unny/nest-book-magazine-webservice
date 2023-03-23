import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"
import { ApiProperty } from '@nestjs/swagger';

export class createBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly author: string
    
    readonly currency: string

    readonly photo: string

    @ApiProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    readonly price: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Category, {message:"Please enter correct category"})
    readonly category: Category

    @ApiProperty()
    readonly user: string
}