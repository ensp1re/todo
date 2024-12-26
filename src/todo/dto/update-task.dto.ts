import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto {

    // title
    @ApiProperty(
        {
            example: 'To do something',
            description: 'The title of the task',
            type: String,
            required: true
        }
    )
    @IsString({
        message: 'Title must be a string'
    })
    @MaxLength(100, {
        message: 'Title is too long'
    })
    title: string;


    // description
    @ApiProperty(
        {
            example: 'To do something',
            description: 'The description of the task',
            type: String,
            required: false
        }
    )
    @MaxLength(500, {
        message: 'Description is too long'
    })
    @IsString({
        message: 'Description must be a string'
    })
    @IsOptional()
    description: string;
}