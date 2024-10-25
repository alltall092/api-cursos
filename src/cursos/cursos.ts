import { ApiProperty } from '@nestjs/swagger';
enum NivelEnum {
    Principiante = "Principiante",
    Intermedio = "Intermedio",
    Avanzado = "Avanzado"
}
export class Cursos {


    @ApiProperty()
    public titulo: string;
    @ApiProperty()
    public imagenes: string;
    @ApiProperty()
   public  descripcion: string;
   @ApiProperty()
    public price: number
    @ApiProperty()
    public quantity:number




}
