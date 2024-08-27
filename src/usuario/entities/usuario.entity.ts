import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tarefa } from "../../tarefa/entities/tarefa.entity"



@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail({}, { message: 'O campo usuario deve ser um endereço de email válido.' })
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string

    @Column({ length: 255, nullable: false, default: 'user' })
    tipo: string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @Matches(/^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message: 'A senha deve conter pelo menos um caractere especial e uma letra minúscula.',
    })
    senha: string;


    @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario)
    tarefa: Tarefa[]
    
}