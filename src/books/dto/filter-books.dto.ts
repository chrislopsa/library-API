import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterBooksDto {
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    publication_date?: Date; 

    @IsOptional()
    @IsString()
    title?: string; 

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsNumber()
    gender_id?: number; 
}