import { Order } from 'src/entity/order.entity';
import { OrderService } from './order.service';
import { Body, Controller,Get, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
ApiTags('Order')
@Controller('order')
export class OrderController {
constructor(private orderservi:OrderService){}
@Get()
async getOrder():Promise<Order[]>{
try {
    const order=await this.orderservi.getOrder();
    return order;
} catch (error) {
    console.log("error no cargan los datos ");
}

}
@Post()
async postOrder(@Body() body:any){
try {
    const order=await this.orderservi.addOrder(body);
    return order;
} catch (error) {
     
    console.log("error no ser insertan los datos");
}

}

}
