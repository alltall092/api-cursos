import { Column,Entity,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Course } from "./cursos.entity";
@Entity()
export class Categories{
@PrimaryGeneratedColumn('increment')
id:number
@Column({nullable:false})
name:string;




}