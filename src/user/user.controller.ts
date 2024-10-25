import { Controller,Get,Post,Param,Body,Put,Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('user')

export class UserController {
constructor(private readonly serviUser:UserService){}

@Get()
async getfindall():Promise<Users[]>{
try {
const users= await this.serviUser.getfindall();  
return users;
} catch (error) {
    console.log('error no cargan los usuarios')



}

}
@Get(':id')
async getByUser(@Param('id') id:number){
try {
    const user=await this.serviUser.getByUser(id);
    return user;
} catch (error) {
    console.log('no cargar los datos');
}


}
@Post()
async postUser(@Body() body:any):Promise<any>{
try {
const user=await this.serviUser.postUser(body);
return user;  
} catch (error) {
    console.log('no se pueden insertar los datos')
}


}
@Put(':id')
async putUser(@Param('id') id:number,@Body() body:any):Promise<any>{
try {
    const user=await this.serviUser.updateUser(id,body);
    return user;
} catch (error) {
    console.log('no se actualizaron los datos');
}


}
@Delete(':id')
async deleteUser(@Param('id') id:number):Promise<any>{
try {
    const user=await this.serviUser.deleteUser(id);
    return user
} catch (error) {
    console.log('no se puende elimimar');
}


}
}
