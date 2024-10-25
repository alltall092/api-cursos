import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileTypeValidator, Logger, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { UserSeeder } from './seeder/user.seeder';
import { CategoriesSeeder } from './seeder/categories.seeder';
import {CourseSeeder} from './seeder/course.seeder';
import { ValidationPipe } from '@nestjs/common';
import * as winston from 'winston';
import * as cors from 'cors'; 
import * as express from 'express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  app.use(cors());

  const logge = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  //logge.log('info', 'Este es un mensaje de registro de información');
  //logge.error('Este es un mensaje de error');
  // Obtén una instancia del sembrador
  const userSeeder = app.get(UserSeeder);
  const categoriesSeeder=app.get(CategoriesSeeder);
  const courseSeeder=app.get(CourseSeeder);
  app.useGlobalPipes(new ValidationPipe({

    transform:true
  }));
  app.use('/course', express.static('uploads'));
  // Ejecuta el sembrador
 //await userSeeder.seed();
 //await categoriesSeeder.seed();
 await courseSeeder.seed();
 const config = new DocumentBuilder()
 .setTitle('Api de  ecommerce de vender cursos')
 .setDescription('The cats API description')
 .setVersion('1.0')
 .addTag('Cart')
 .addTag('Products')
 .addTag('Users')
 .addTag('Cursos')
 .addBearerAuth()
 
 
 .build();
 
 const options: SwaggerDocumentOptions =  {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey
};
const document = SwaggerModule.createDocument(app, config,options);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Application started');
}
bootstrap();
