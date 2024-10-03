import { IsNotEmpty, IsDate, IsString, IsNumber, Matches } from "class-validator";
import { Type, plainToClass  } from 'class-transformer';



export class CreateBookDto {
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    //@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en el formato YYYY-MM-DD' })
    publication_date: Date;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    gender_id: number;
}