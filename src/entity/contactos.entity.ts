import { Column,Entity,PrimaryGeneratedColumn,OneToMany } from "typeorm";
@Entity()
export class Contactos{
@PrimaryGeneratedColumn('increment')
id:number
@Column({nullable:false})
nombre:string;
@Column({nullable:false})
email:string;
@Column({type:'text'})
comentario:string;



}