import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Agendamento } from "../../agendamento/entities/agendamento.entity";
import { Usuario } from "../../auth/usuario/entities/usuario.entity";


@Entity({name: "tb_servicos"})
export class Servico {
        @PrimaryGeneratedColumn()
        id:number;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        servico: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: true})
        descricao: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        valor: string;

        @ManyToOne(() => Agendamento, (agendamento) => agendamento.servico, {
            onDelete: "CASCADE",
        })
        agendamento: Agendamento;

        @ManyToOne(() => Usuario, (usuario) => usuario.servico, {
            onDelete: "CASCADE"
        })
        usuario: Usuario
    }