import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs/promises'; 
import { Response,Request } from 'express';
@ApiTags('Cart')
@Controller('cart')
export class CartController {
constructor(private servicart:CartService){}
@Post('addcart')
async addcart(@Body() body:any){
  console.log(body);
try {
const courseId=body.courseId;

    const cart=await this.servicart.addCart(courseId);
    return cart;
    
} catch (error) {
    console.log('error productos no insertado',error);
}
}

@Get()
async getCart(@Res() res:Response,@Req() req:Request){
try {
  
  const filesFromDB=await this.servicart.getCart(); 
  const filesFromFS = await fs.readdir('uploads');
console.log('Archivos en uploads:', filesFromFS);
const imageUrls = filesFromDB
              .filter((fileFromDB) => filesFromFS.includes(fileFromDB.course.imagenes))
              .map((file) =>({
                id:file.id,
                titulo:file.course.titulo,
                contenido:file.course.descripcion,
                url: `${req.protocol}://${req.get('host')}/course/${file.course.imagenes}`,
                instructor:file.course.autor_instructor,
                duracion:file.course.duracion,
                nivel:file.course.nivel,
                categoria:file.course.categoria,
                price:file.course.precio,
                fecha_creacion:file.course.fecha_creacion,
                estado:file.course.estado_curso,
                courseId:file.courseId,
                quantity:file.quantity,
                userId:file.userId
                
              
                
              
              }))
return res.json(imageUrls);
  
} catch (error) {
   console.log('no cargan los datos'); 
}


}
@Delete()
async deleteCart(@Param('id') id:number){
try {
  const cart=await this.deleteCart(id);
  return cart;
} catch (error) {
  console.log('no se puede eliminar los datos')
}
}
}

