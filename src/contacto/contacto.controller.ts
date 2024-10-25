import { Controller, Get, Post,Body} from '@nestjs/common';
import { ContactoService } from './contacto.service';

@Controller('contacto')
export class ContactoController {
constructor(private servi:ContactoService){}

@Get()
getContactos(){

return this.servi.getContactos();
}
@Post()
postContacto(@Body() datos:any){
return this.servi.postContactos(datos);
}


}
