import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  category: string;
}
