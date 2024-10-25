import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../create-user-dto/create-user-dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async Login(@Body() credentials:CreateUserDto, @Res() res: any) {
      try {
        const result = await this.authService.authenticate(credentials);
  
        if (result) {
          const { username, email} = result.result;
          const user = { username, email };
          const token = this.authService.genToken(user);
          
          res.json({ ...user,token });
        } else {
          throw new HttpException('Información inválida', HttpStatus.BAD_REQUEST);
        }
      } catch (error) {
        throw new HttpException('Email o contraseña inválida', HttpStatus.BAD_REQUEST);
      }
    }



}
