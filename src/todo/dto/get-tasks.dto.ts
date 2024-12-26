import { IsInt, IsOptional, IsIn, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ListTasksDto {
    @ApiPropertyOptional({ description: 'Page number (default: 1)', example: 1, type: Number })
    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Page size (default: 10, max: 100)', example: 10, type: Number })
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    pageSize?: number = 10;

    @ApiPropertyOptional({ description: 'Filter by status (pending or done)', example: 'pending', type: String, enum: ['pending', 'done'] })
    @IsOptional()
    @IsIn(['pending', 'done'])
    status?: 'pending' | 'done';

    @ApiPropertyOptional({ description: 'Sort by field (createdAt or status)', example: 'createdAt', type: String, enum: ['createdAt', 'status'] })
    @IsOptional()
    @IsIn(['createdAt', 'status'])
    sortBy?: 'createdAt' | 'status';

    @ApiPropertyOptional({ description: 'Sort order (asc or desc)', example: 'asc', type: String, enum: ['asc', 'desc'] })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    orderBy?: 'asc' | 'desc';
}
