import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { FilterBooksDto, CreateBookDto, UpdateBookDto } from '../dto';
import { isUUID } from 'validator';
import { Injectable,
     HttpException, 
     HttpStatus, 
     NotFoundException, 
     BadRequestException } from '@nestjs/common';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ){}

    async findOne(id: string): Promise<Book>{
        try {
            if(!isUUID(id)){
                throw new BadRequestException(`ID ${id} is not a valid uuid`);
            }
            const book: Book = await this.bookRepository.findOne({ where: {id} });

            if(!book){
                throw new NotFoundException(`book with ID ${id} NOT FOUND`);
            }
    
            return book;
            
           
        } catch (error) {

            if(error instanceof NotFoundException){
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            if(error instanceof BadRequestException){
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('internal server error', HttpStatus.BAD_REQUEST);
        }
    }

    async getAll(): Promise<Book[]> {
        try {
            return await this.bookRepository.find()
        } catch (error) {
            throw new HttpException("Error foundind books", HttpStatus.BAD_REQUEST)
        } 
    }

    async findBooks(filterBooksDto: FilterBooksDto): Promise<Book[] | { message: string }>{

        try {
            const queryBuilder = this.bookRepository.createQueryBuilder('book');
            const {publication_date, author, gender_id, title} = filterBooksDto;
    
            if(publication_date){
                queryBuilder.andWhere('book.publication_date = :publication_date', { publication_date });
            }
            
            if(author){
                queryBuilder.andWhere('book.author = :author', { author });
            }
    
            if(title){
                queryBuilder.andWhere('book.title = :title', { title });
            }
    
            if(gender_id){
                queryBuilder.andWhere('book.gender_id = :gender_id', { gender_id });
            }
            const books: Book[] = await queryBuilder.getMany();

            if (books.length === 0) {
                throw new NotFoundException("no books found with the specified parameters");
            }

            return books;

        } catch (error) {
            if(error instanceof NotFoundException){
                return { message: error.message};
            }
            throw new HttpException('Error founding books', HttpStatus.BAD_REQUEST);
        }
    }

    async create(createBookDto: CreateBookDto): Promise<{ message: string; book: Book}> {
        try {
            const publication_date: Date = createBookDto.publication_date;

            if(publication_date >= new Date()){
                
                throw new HttpException("Publication date must be prior to the current date", 
                                        HttpStatus.BAD_REQUEST)
            }
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

    async update(id: string, updateDto: UpdateBookDto): Promise<{ message: string, book: Book }> {
        try {
            const book: Book = await this.findOne(id);
            const newBookData: Book = Object.assign(book, updateDto); 
            const updatedBook: Book = await this.bookRepository.save(newBookData); 

            return{
                message: `Book information with ID ${id}, successfully updated`,
                book: updatedBook
            };

        } catch (error) {  
            throw new HttpException(error.message, error.status);
        }
    }
}
