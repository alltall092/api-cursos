import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
@Injectable()
export class StripeService {
    private readonly stripe: Stripe;

    constructor() {
      this.stripe = new Stripe('sk_test_51IOB3XGuY2qOE3VYB3Cloc6sGDOpRvWZ2RdNIiw6OLqxaHB40wJ6iuzAtgE50Kfxl3Ac1uihPYjzeTcvtNNbXEcY00FL06W9kq', {
        // Opciones de configuración de Stripe, si es necesario
      });
    }
    async crearSesionCheckout(priceId:string, YOUR_DOMAIN: string): Promise<string> {
        try{const prices = await this.stripe.prices.list({
            // Aquí puedes incluir cualquier filtro o parámetro de consulta necesario
          });
          
          // Supongamos que tienes un precio específico en mente, digamos 'price_123456'
          const precioElegido = 'price_123456';

            const session = await this.stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [
                  {
                    price:precioElegido,
                    quantity: 1,
                  },
                ],
                ui_mode: 'embedded',
                success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${YOUR_DOMAIN}?canceled=true`,
              });
        
    
        return session.url;
    }catch(err){
throw err;


    }
      }
    }

