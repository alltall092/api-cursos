import { Injectable } from '@nestjs/common';
import {Categories} from '../entity/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CategoriesService {

    constructor(
        
       @InjectRepository(Categories)
    private repository:Repository<Categories>
    ){}
    

getCategories():Promise<Categories[]>{
    try{
const categories=this.repository.find();
return categories;


    }catch(err){

throw err;

    }




}


}
