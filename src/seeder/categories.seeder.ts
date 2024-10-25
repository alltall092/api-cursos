import { Categories } from './../entity/categories.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/user.entity';

@Injectable()
export class CategoriesSeeder {
  constructor(
    @InjectRepository(Categories)
    private readonly userRepository: Repository<Categories>,
  ) {}

  async seed() {
    const categoriasDeCursos = [
        { name: "Desarrollo web" },
        { name: "Desarrollo móvil" },
        { name: "Inteligencia Artificial" },
        { name: "Ciencia de datos" },
        { name: "Seguridad informática" },
        { name: "Programación de juegos" },
        // Agrega más categorías según sea necesario
    ];
    
    
  

    await Promise.all(categoriasDeCursos.map(async (categories) => {
      const newCategories =  this.userRepository.create(categories);
      await this.userRepository.save(newCategories);
    }));
  }
}