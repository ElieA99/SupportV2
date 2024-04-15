import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  //add cat
  async addCat(
    //createCategoryDto: CreateCategoryDto
    category: String,
  ) {
    const newCat = await this.categoryModel.create({ category });
    await newCat.save();
    console.log('New Category Created!');
    return newCat;
  }
  //delete cat
  async deleteCat(id: string) {
    const filter = { _id: id };
    //check if complaint is available before delete
    const ifExists = await this.categoryModel.findOne({ filter });
    if (!ifExists) {
      console.log('ُComplaint not found');
    }

    const deleted = await this.categoryModel.deleteOne(filter);
    return deleted;

    // console.log(id);
    // const cat = await this.categoryModel.findByIdAndDelete({ id });

    // return console.log({ message: 'Category Deleted', data: cat });
  }
}
