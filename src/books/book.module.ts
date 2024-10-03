import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], 
  controllers: [BooksController],
  providers: [BooksService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})
export class BooksModule {}
