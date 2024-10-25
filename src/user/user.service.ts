import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

constructor(  
    @InjectRepository(Users)
    private repository:Repository<Users>){}

 getfindall():Promise<Users[]>{

return this.repository.find();


    }

getByUser(id:number):Promise<Users[]>{
try {
    return this.repository.find({where:{id:id}})
} catch (error) {
    throw error;
}


}

 postUser(datos:Users):Promise<Users>{
try {
    const newUser= this.repository.create(datos);
    return this.repository.save(newUser);
} catch (error) {
   throw error 
}


}

async updateUser(id:number,datos:Users):Promise<void>{
try {
await this.repository.update({id},datos);

} catch (error) {
    throw error;
}



}
async deleteUser(id:number):Promise<void>{
try {
 await this.repository.delete(id);

} catch (err) {
    throw err;
}


}

}
