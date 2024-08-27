import { IsIn, IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "../../usuario/entities/usuario.entity";


@Entity({name: "tb_tarefas"})
export class Tarefa {
        @PrimaryGeneratedColumn()
        id:number;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        tarefa: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: true})
        descricao: string;

        @IsIn(['pendente', 'executando', 'concluido'])
        @Column({ length: 100, nullable: false, default: 'pendente' })
        status: string;

        @ManyToOne(() => Usuario, (usuario) => usuario.tarefa, {
            onDelete: "CASCADE"
        })
        usuario: Usuario
    }