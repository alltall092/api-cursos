

import { Entity, PrimaryGeneratedColumn,JoinColumn,Column,ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm';
import { IsEnum } from 'class-validator';
import { Categories } from './categories.entity';
import { Cart } from './cart.entity';
import {Order } from './order.entity';

enum NivelEnum {
    Principiante = 'principiante',
    Intermedio = 'intermedio',
    Avanzado = 'avanzado',
}
@Entity()
export class Course {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;
    @Column({nullable:false})
    imagenes:string;


    @Column('text')
    descripcion: string;

    @Column()
    autor_instructor: string;

    @Column()
    duracion: string;

    @Column({
        type: 'enum',
        enum: NivelEnum,
        default: NivelEnum.Principiante // Set default value using the enum value
    })
    @IsEnum(NivelEnum)
    nivel: string;


    @Column()
    categoria: string;

    @Column('float')
    precio: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fecha_creacion: Date;

    @Column({ type: 'enum', enum: ['publicado', 'borrador'], default: 'borrador', name: 'estado_curso' })
    estado_curso: string;

   
    @OneToMany(() =>Categories,categories=>categories.id)
    @JoinTable()
    categories: Categories[]

   @Column()
   courseId:number;
   
    @UpdateDateColumn()
    updated_at: Date;
}
