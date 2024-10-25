import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Course } from '../entity/cursos.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number; // Assuming userId as a reference to the user who placed the order

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'courseId' })
    course: Course;

  
    @Column()
    quantity: number;

    @Column('float')
    totalPrice: number;

    @Column({ default: false })
    isPaid: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
