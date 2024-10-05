import { Body, Controller, Get, Post, Param, Put} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { CreateBookDto, FilterBooksDto, UpdateBookDto } from '../dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book>{
        return await this.booksService.findOne(id);
    } 

    @Post('filter')
    async filterBooks(@Body() filterBooks: FilterBooksDto): Promise<Book[] | { message: string }>{
        return await this.booksService.findBooks(filterBooks);
    }

    @Post('create')
    async create(@Body() createBookDto: CreateBookDto ): Promise<{ message: string; book: Book}> {
        return await this.booksService.create(createBookDto);
    } 

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateBookDto): Promise<{ message: string, book: Book }>{
        return this.booksService.update(id, updateDto);
    }
}
