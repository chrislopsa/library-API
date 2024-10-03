import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create-book.dto';
import { log } from 'console';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ){}

    async getAll(){
        return await this.bookRepository.find()
    }

    async create(createBookDto: CreateBookDto): Promise<{ message: string; book: Book}> {
        try {
            const publication_date: Date = createBookDto.publication_date;
            // if(publication_date >= new Date()){
                
            //     throw new HttpException("Publication date must be prior to the current date", 
            //                             HttpStatus.BAD_REQUEST)
            // }
            const book: Book =  this.bookRepository.create(createBookDto);      
            const savedBook = await this.bookRepository.save(book);
            return {
                message: 'Successfully created user',
                book: savedBook,
            }
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
        }
    }
}
