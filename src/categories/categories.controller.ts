import { Controller,Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from '../entity/categories.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Cursos')
@Controller('categories')
export class CategoriesController {
constructor(private serviCategories:CategoriesService){}



@Get()  
async getCategories():Promise<Categories[]>{
    try {
    const categories= await this.serviCategories.getCategories();
    return categories;
    } catch (error) {
        
    }
    
}
}