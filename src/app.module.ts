import { Module } from '@nestjs/common';
import { BooksModule } from './books/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:  5432,
      username: 'username',
      password: 'bdpasswordpsql',
      database:'library_api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), BooksModule],
  controllers: [],
  providers: [],

})
export class AppModule {} 
