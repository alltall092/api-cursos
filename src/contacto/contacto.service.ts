import { Contactos } from './../entity/contactos.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ContactoService {
constructor(@InjectRepository(Contactos)
private  repositoryCon:Repository<Contactos>){}


getContactos():Promise<Contactos[]>{
const contact=this.repositoryCon.find();
return contact;


}
postContactos(datos:any){
const contact=this.repositoryCon.create(datos);
return this.repositoryCon.save(contact);
}
}
