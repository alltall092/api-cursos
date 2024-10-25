import { Controller,Get,Put,Post,Delete,Body,Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
 public producto:any= [
        { id: 1, nombre: "Producto 11", precio: 10.99 },
        { id: 2, nombre: "Producto 2", precio: 20.49 },
        { id: 3, nombre: "Producto 3", precio: 15.99 },
        { id: 4, nombre: "Producto 4", precio: 25.99 },
        { id: 5, nombre: "Producto 5", precio: 12.99 },
        { id: 6, nombre: "Producto 6", precio: 18.99 },
        { id: 7, nombre: "Producto 7", precio: 22.99 },
        { id: 8, nombre: "Producto 8", precio: 27.99 },
        { id: 9, nombre: "Producto 9", precio: 30.99 },
        { id: 10, nombre: "Producto 10", precio: 35.99 }
    ];
@Get()
getproducts():any[]{
return this.producto;


}
@Get(':id')
getproduct(@Param('id') id:number):number{
const filtrar=this.producto.find((x:any)=>x.id=id);
return filtrar;
}

@Post()
postproducts(@Body() body):any[]{
return this.producto.push(body);


}
@Put(':id')
updateproduct(@Param('id') id:number,@Body() body):any[]{

return {...this.producto, id:id, nombre: body.nombre,precio:body.precio };


}
@Delete(':id')
deleteProduct(@Param('id') id:number):void{
const index=this.producto.findIndex((x:any)=>x.id===id);
this.producto.splice(index,1);


}
}
