import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agendamento } from "./entities/agendamento.entity";
import { AgendamentoService } from "./service/agendamento.service";
import { AgendamentoController } from "./controller/agendamento.controller";


@Module ({
    imports: [TypeOrmModule.forFeature([Agendamento])],
    providers: [AgendamentoService],
    controllers: [AgendamentoController],
    exports: [TypeOrmModule]
})

export class AgendamentoModule {}