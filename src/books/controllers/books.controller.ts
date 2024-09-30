import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';


@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Get()
    async findAll(): Promise<Book[]>{
        return await this.bookService.getAll();
    }

    @Post()
    async create(@Body() createBookData: CreateBookDto ){
        return await this.bookService.create(createBookData)
    } 
}
