import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @ApiProperty()
    
    
    username: string;

    @ApiProperty()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    email: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;
  
  

}
