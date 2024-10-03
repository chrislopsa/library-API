import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}

    @Get()
    async findAll(): Promise<Book[]>{
        return await this.booksService.getAll();
    }

    @Post()
    async create(@Body() createBookDto: CreateBookDto ): Promise<{ message: string; book: Book}> {
        return await this.booksService.create(createBookDto);
    } 
}
