
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {Cart } from '../entity/cart.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/entity/cursos.entity';

@Injectable()
export class CartService {
constructor(
    @InjectRepository(Cart)
private cartRepository:Repository<Cart>,
@InjectRepository(Course)
private courseRepository:Repository<Course>


){}


 async addCart(courseId:number):Promise<Cart | Course>{
try {

    const course = await this.courseRepository.findOne({where:{id:courseId}})
    if (!course) {
        throw new Error(`El curso con ID ${courseId} no existe.`);
    }

    // Buscar si ya existe un carrito para este curso
    let cart = await this.cartRepository.findOne({ where: { courseId: courseId } });

    // Si no existe un carrito para este curso, crear uno nuevo
    if (!cart) {
        cart = this.cartRepository.create({
            courseId: courseId,
            quantity: 1 // Inicializamos la cantidad a 1
        });
    } else {
        // Si el carrito ya existe, incrementar la cantidad en 1
        cart.quantity += 1;
    }

    // Guardar el elemento de carrito en la base de datos
    return await this.cartRepository.save(cart);

 


} catch (error) {
    throw error;
}



}
async getCart():Promise<Cart[]>{
try {
    const cart = await this.cartRepository.find({
    relations: {
        course: true,
    },
});

return cart;
    
} catch (error) {
    
}


}
async deleteCart(id:number):Promise<void>{
try {
    await this.cartRepository.delete(id);
    
} catch (error) {
    throw error;
}

}

}
