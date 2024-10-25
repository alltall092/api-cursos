import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserSeeder } from './seeder/user.seeder';
import { Users } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { APP_PIPE } from '@nestjs/core';
import { Course } from './entity/cursos.entity';
import { Categories } from './entity/categories.entity';
import {CategoriesSeeder} from './seeder/categories.seeder';
import { CourseSeeder } from './seeder/course.seeder';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import {Cart } from './entity/cart.entity';
import { StripeModule } from './stripe/stripe.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { Order } from './entity/order.entity';
import { ContactoController } from './contacto/contacto.controller';
import { ContactoService } from './contacto/contacto.service';
import { Contactos } from './entity/contactos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users,Course,Categories,Cart,Order,Contactos]),
    DatabaseModule,
    StripeModule],
  controllers: [AppController, ProductsController, UserController, AuthController, CourseController, CategoriesController, CartController, OrderController, ContactoController],
  providers: [AppService, UserService,UserSeeder,CourseSeeder, AuthService,CategoriesSeeder,CourseService,OrderService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }, CategoriesService, CartService, ContactoService],
})
export class AppModule {}
