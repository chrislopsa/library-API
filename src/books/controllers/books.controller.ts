import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { CreateBookDto, FilterBooksDto } from '../dto';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}

    @Post('filter')
    async filterBooks(@Body() filterBooks: FilterBooksDto): Promise<Book[] | { message: string }>{
        return await this.booksService.findBooks(filterBooks);
    }

    @Post('create')
    async create(@Body() createBookDto: CreateBookDto ): Promise<{ message: string; book: Book}> {
        return await this.booksService.create(createBookDto);
    } 
}
