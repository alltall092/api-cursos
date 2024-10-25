import { Injectable } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
constructor(
 @InjectRepository(Order)
private  repository:Repository<Order>){}

getOrder(){
try {
    const order=this.repository.find({relations:{course:true}});
    return order;
} catch (error) {
    throw error;
}

}

addOrder(data:any){
try {

const order =this.repository.create(data);
return this.repository.save(order);
    
} catch (error) {
    throw error;
}


}


}
