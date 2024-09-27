import { Module } from '@nestjs/common';
import { BooksModule } from './books/book.module';

@Module({
  imports: [BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
