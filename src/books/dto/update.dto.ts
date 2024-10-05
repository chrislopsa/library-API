import { IsDate, IsString, IsNumber, IsNotEmpty  } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    publication_date?: Date;

    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    author?: string;

    @IsNotEmpty()
    @IsNumber()
    gender_id?: number;
}