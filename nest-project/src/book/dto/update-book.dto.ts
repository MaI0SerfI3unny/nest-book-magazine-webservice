import { IsNumber, IsOptional, IsString,IsEnum } from "class-validator"
import { Category } from "../schemas/book.schema"
import { ApiProperty } from '@nestjs/swagger';


export class updateBookDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly title: string
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly description: string
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly author: string
    @IsOptional()
    @IsNumber()
    @ApiProperty({type: Number})
    readonly price: number
    readonly currency: string
    @IsOptional()
    @ApiProperty()
    @IsEnum(Category, {message:"Please enter correct category"})
    readonly category: Category
    
    readonly photo: string
    
    readonly user: string
}