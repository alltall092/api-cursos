import { Body, Controller, Post, Req, Res,Headers } from '@nestjs/common';

const YOUR_DOMAIN="http://localhost:4200/"
import Stripe from 'stripe';
import { Cursos } from '../cursos/cursos';
import { ApiTags } from '@nestjs/swagger';
ApiTags('Stripe')

@Controller('stripe')
export class StripeController {
    private readonly stripe: Stripe;

    constructor() {
      this.stripe = new Stripe('sk_test_51IOB3XGuY2qOE3VYB3Cloc6sGDOpRvWZ2RdNIiw6OLqxaHB40wJ6iuzAtgE50Kfxl3Ac1uihPYjzeTcvtNNbXEcY00FL06W9kq', {
        // Opciones de configuración de Stripe, si es necesario
      });
    }
@Post()
async postCheckout(@Body() body:Cursos){
try {

    const products=[];
    const line_items=[];
    const prices=[];
    
const items=[{titulo:body.titulo,imagenes:body.imagenes,descripcion:body.descripcion,price:body.price,quantity:body.quantity}];
    
    for( let itemData of items){
    const product=await this.stripe.products.create({
      name:itemData.titulo,
      description:itemData.descripcion,
      images:['https://static.vecteezy.com/system/resources/thumbnails/023/329/714/small/heart-tree-love-for-nature-red-landscape-at-sunset-generativ-ai-photo.jpg']
    }
    )
   products.push(product);
  
   const price = await this.stripe.prices.create({
  product:product.id,
  unit_amount:itemData.price*100,
  currency:'USD'

  });
  prices.push(price);

  line_items.push({
    price:price.id,
    quantity:itemData.quantity || 1
  })
  
  // Supongamos que tienes un precio específico en mente, digamos 'price_123456'


    const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [...line_items
    
        ],
        
        success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });


return session.url;
    }
 
} catch (error) {
    console.log('no puede resolver',error)
}

}
  @Post('payment')
async postSucription(@Body()body:Cursos){
try {
 
  const items=[{titulo:body.titulo,imagenes:body.imagenes,descripcion:body.descripcion,price:body.price,quantity:body.quantity}];
    
  for( let itemData of items){

  const session = await this.stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price_data: {
          unit_amount:itemData.price*100,
          currency: 'USD',
          recurring: {
            interval: 'month',
          },
          product_data: {
            name: itemData.titulo,
            description:itemData.descripcion,
            images:[itemData.imagenes]

          },
        },
        quantity:itemData.quantity,
      }      ],
  
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/canceled.html`,
    payment_method_types: ['card'],
        currency: 'USD'
    // automatic_tax: { enabled: true }
  });

  return session.url;
  // Crear un método de pago adjunto (puede ser una tarjeta de crédito, débito, etc.)
 /* const paymentMethod = await this.stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242', // Número de tarjeta de prueba
      exp_month: 12,
      exp_year: 2023,
      cvc: '123',
    },
  });
 
  // Crear un cliente anónimo utilizando el método de pago adjunto
  const customer = await this.stripe.customers.create({
    payment_method: paymentMethod.id,
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });


  
  // Obtenemos el ID del cliente recién creado
  const newCustomerId = customer.id;
  const prices = await this.stripe.prices.list({ type: 'recurring' });

  // Supongamos que deseas utilizar el primer precio de la lista
  const selectedPrice = prices.data[0];
  
  // Crear la suscripción utilizando el ID del precio seleccionado
  const subscription = await this.stripe.subscriptions.create({
    customer: newCustomerId,
    items: [{ price: selectedPrice.id }],
    expand: ['latest_invoice.payment_intent'],
  });
  0
return subscription;*/
  }

} catch (error) {
  console.log(error)
}

}
@Post('webhook')
async handleWebhook(
  @Body() body: any,
  @Headers('stripe-signature') sig: string,
) {
  try {
    const rawPayload = Buffer.from(JSON.stringify(body));
    const event = await this.stripe.webhooks.constructEventAsync(rawPayload, sig,'whsec_Sc1A31XOWT550jHV5z5YbBfau7ttUyXl');
    // Manejar el evento
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // Definir y llamar a una función para manejar el evento checkout.session.completed
        break;
      // ... manejar otros tipos de eventos
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }
  } catch (error) {
    console.error('Error en el webhook:', error);
    throw error;
  }
  // Devolver una respuesta 200 para confirmar la recepción del evento
  return "Webhook recibido correctamente";
}

}