import { Body, Controller, Post,Get,Param, UploadedFile,Res,Req, UseInterceptors,HttpStatus, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises'; 
import * as path from 'path';
import { CourseService } from './course.service';
import { fileURLToPath } from 'url';
import { Categories } from '../entity/categories.entity';
import { FileTypeValidator, Logger, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response,Request } from 'express';
import {Course } from '../entity/cursos.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Cursos')
@Controller('course')
export class CourseController {
constructor(private servicourse:CourseService){}
    @Post()
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directorio donde se almacenarán los archivos
        filename: (req, file, cb) => {
          // Personaliza el nombre del archivo si es necesario
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }))
     async uploadFile(@UploadedFile() file: Express.Multer.File,@Body() body:any) {
    
    if (!file) {
        throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
      }
      
      // Reemplaza con la URL base de tus archivos estáticos
      const datos = {
        titulo: body.titulo,
        descripcion: body.descripcion,
        autor_instructor: body.autor_instructor,
        duracion: body.duracion,
        nivel: body.nivel,
        categoria: body.categoria,
        precio: body.precio,
        imagenes: file ?  file.filename : null // Concatenamos la base URL con el nombre del archivo si existe
      };
   
  const course=await this.servicourse.postCourse(datos);
      // Aquí puedes hacer lo que necesites con el archivo
      return { message: 'File uploaded successfully',course};
      

    
    
        // Procede a guardar el archivo
     
        // Mueve el archivo a la carpeta de destino
       
        // Devuelve el nombre del archivo o la ruta, lo que necesites
  
      }
     
      @Get()
       async getCourse( @Res() res: Response,@Req() req:Request){
try{
const filesFromDB=await this.servicourse.getCourse();
//const filePath = path.join('uploads', filename);
  
    
const filesFromFS = await fs.readdir('uploads');
console.log('Archivos en uploads:', filesFromFS);
const imageUrls = filesFromDB
              .filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
              .map((file) =>({
                id:file.id,
                titulo:file.titulo,
                contenido:file.descripcion,
                url: `${req.protocol}://${req.get('host')}/course/${file.imagenes}`,
                instructor:file.autor_instructor,
                duracion:file.duracion,
                nivel:file.nivel,
                categoria:file.categoria,
                price:file.precio,
                fecha_creacion:file.fecha_creacion,
                estado:file.estado_curso,
                courseId:file.courseId
                
              
                
              
              }))
return res.json(imageUrls);


}catch(err){

console.log('no cargar los datos',err)

}  }
@Get('/:id')
 async getCourseById(@Param('id') courseId:number, @Res() res: Response,@Req() req:Request){
 
  try{
    const filesFromDB=  await this.servicourse.getByCourseId(courseId);
    //const filePath = path.join('uploads', filename);
      
        
    const filesFromFS = await fs.readdir('uploads');
    console.log('Archivos en uploads:', filesFromFS);
    const imageUrls =  filesFromDB.filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
                  .map((file) =>({
                    id:file.id,
                    titulo:file.titulo,
                    contenido:file.descripcion,
                    url: `${req.protocol}://${req.get('host')}/course/${file.imagenes}`,
                    instructor:file.autor_instructor,
                    duracion:file.duracion,
                    nivel:file.nivel,
                    categoria:file.categoria,
                    price:file.precio,
                    fecha_creacion:file.fecha_creacion,
                    estado:file.estado_curso,
                    courseId:file.courseId
                    
                  
                    
                  
                  }))
    return res.json(imageUrls);
    
    
    }catch(err){
    
    console.log('no cargar los datos',err)
    
    } 
}
}
