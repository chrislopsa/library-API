import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ){}

    async getAll(){
        return await this.bookRepository.find()
    }

    async create(createBookData: CreateBookDto){
        const book =  this.bookRepository.create(createBookData)
        return this.bookRepository.save(book)
    }
}
