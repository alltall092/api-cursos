
import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entity/cursos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
constructor(
    @InjectRepository(Course)
   // @InjectRepository(Categories)
private repository:Repository<Course>,
){}


getCourse():Promise<Course[]>{

try {
  const cursos=this.repository.find();
  return cursos;  
} catch (err) {
   throw err;
}

}
getByCourseId(courseId:number):Promise<Course[]>{
    const cursos=this.repository.find({
        where: {
            id:courseId,
        },
    });
    return cursos;

}
postCourse(datos:any):Promise<Course[]>{
try {
    const newCourse=this.repository.create(datos);
    return this.repository.save(newCourse);
} catch (error) {
    throw error;
}


}

}

