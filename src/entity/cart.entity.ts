import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Course } from '../entity/cursos.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number; // Assuming userId as a reference to the user who owns the cart

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @Column()
    courseId: number;

    @Column()
    quantity: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
