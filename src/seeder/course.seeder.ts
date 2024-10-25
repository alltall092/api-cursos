import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entity/cursos.entity';

@Injectable()
export class CourseSeeder {
  constructor(
    @InjectRepository(Course)
    private readonly userRepository: Repository<Course>,
  ) {}

  async seed() {
    const NivelEnum = {
        Principiante: 'principiante',
        Intermedio: 'intermedio',
        Avanzado: 'avanzado'
    };
    
    // Define un arreglo de cursos
    const cursos = [
        {
            titulo: "Curso de Desarrollo Web",
            descripcion: "Aprende a desarrollar sitios web.",
            autor_instructor: "Juan Pérez",
            duracion: "8 semanas",
            nivel: NivelEnum.Principiante,
            categoria: "Desarrollo web",
            precio: 49.99
        },
        {
            titulo: "Curso de Inteligencia Artificial",
            descripcion: "Aprende los fundamentos de la inteligencia artificial.",
            autor_instructor: "María García",
            duracion: "12 semanas",
            nivel: NivelEnum.Intermedio,
            categoria: "Inteligencia Artificial",
            precio: 69.99
        },
        // Agrega más cursos según sea necesario
    ];
    
  

    await Promise.all(cursos.map(async (course) => {
      const newCourse =  this.userRepository.create(course);
      await this.userRepository.save(newCourse);
    }));
  }
}