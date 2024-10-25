
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users} from '../entity/user.entity';
import { Course } from '../entity/cursos.entity';
import { Categories } from '../entity/categories.entity';
import { Cart} from '../entity/cart.entity';
import { Order} from '../entity/order.entity';
import { Contactos } from 'src/entity/contactos.entity';


@Module({
imports:[  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'julio',
    password: '120786',
    database: 'cursos',
    entities: [Users,Course,Categories,Cart,Order,Contactos],
    synchronize: true,
    autoLoadEntities:true,
  }),]
    
})
export class DatabaseModule {

}
