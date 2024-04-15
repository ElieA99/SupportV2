import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
 
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //add cat
  @Post('')
  addCat(@Body('category') category: string, res: Response) {
    try {
      
      return this.categoryService.addCat(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //delete cat
  @Delete(':id')
  deleteCat(@Param('id') id: string, res: Response) {
    try {
      return this.categoryService.deleteCat(id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
