import { IsInt, IsNumber, isNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class EditDto {
    @IsNumber()
    id: number

    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsOptional()
    note: string
}