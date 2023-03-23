import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private Book: mongoose.Model<Book>
    ) {}

    async findAll(query: Query) : Promise<{data: Book[], count: Number}> {
        const resPerPage = query.perPage ? Number(query.perPage) : 10
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)
        const keyword = query.title ? {
            title:{
                $regex: query.title,
                $options: 'i'
            }
        }:{}
        const countAllBook = await this.Book.count()
        const books = await this.Book.find({...keyword}).limit(resPerPage).skip(skip)
        return { data: books, count: countAllBook}
    }

    async createBook(book: Book, user: User) : Promise<Book> {
        const data = Object.assign(book, {user: user._id})
        const res = await this.Book.create(data)
        return res
    }

    async findById(id: string) : Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id)
        
        if(!isValidId){
            throw new BadRequestException("Please enter correct id")
        }

        const res = await this.Book.findById(id)
        if(!res){
            throw new NotFoundException("Book wasn`t founded")
        }
        return res
    }

    async updateById(id: string, book: Book, user: User) : Promise<Book> {
        const findBook  = await this.Book.findOne({ user: user._id })
        
        if(!findBook){
            throw new BadRequestException("You not owner this book")
        }
        
        const res = await this.Book.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
        return res
    }

    async deleteById(id: string, user: User) : Promise<Book> {
        const findBook  = await this.Book.findOne({ user: user._id })
        
        if(!findBook){
            throw new BadRequestException("You not owner this book")
        }
        
        return await this.Book.findByIdAndDelete(id)
    }
}
