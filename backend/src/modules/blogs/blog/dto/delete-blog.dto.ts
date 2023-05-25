import { IsBoolean, IsOptional } from 'class-validator';

export class DeleteBlogDto {
    @IsOptional()
    @IsBoolean()
    deletePermanently: boolean;
}
