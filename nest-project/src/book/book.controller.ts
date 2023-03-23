import { Controller,Get,Post,Body,Param,Put,Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('book')
@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery) : Promise<{data: Book[], count: Number}> {
        return this.bookService.findAll(query)
    }

    @Get(":id")
    async getBookById(
        @Param('id') 
        id:string
    ) : Promise<Book> {
        const find = await this.bookService.findById(id)
        return find
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async createNewBook(
        @Body()
        book : createBookDto,
        @Req() req
    ) : Promise<Book> {
        return this.bookService.createBook(book, req.user)
    }

    @Put(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateBook(
        @Param('id') 
        id:string,
        @Body()
        book: updateBookDto,
        @Req() req
    ) : Promise<Book> { 
        return this.bookService.updateById(id, book, req.user)
    }

    @Delete(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteBook(
        @Param('id')
        id:string,
        @Req() req
    ) : Promise<Book> {
        return this.bookService.deleteById(id, req.user)
    }
}
