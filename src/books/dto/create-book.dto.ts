import { IsNotEmpty, IsDate, IsString, IsNumber } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsDate()
    publication_date: Date

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    author: string

    @IsNotEmpty()
    @IsNumber()
    gender_id: number
}