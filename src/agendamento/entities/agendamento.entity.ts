import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Servico } from "../../servico/entities/servico.entity";
import { Usuario } from "../../auth/usuario/entities/usuario.entity";


@Entity({name: "tb_agendamento"})
export class Agendamento {
        @PrimaryGeneratedColumn()
        id:number;

        @IsNotEmpty()
        @Column({ type: 'date', nullable: false })
        data: Date;
    
        @IsNotEmpty()
        @Column({ type: 'time', nullable: true })
        hora: string;

        @OneToMany(() => Servico, (servico) => servico.agendamento)
        servico: Servico[];

        @ManyToOne(() => Usuario, (usuario) => usuario.agendamento, {
            onDelete: "CASCADE"
        })
        usuario: Usuario
    }