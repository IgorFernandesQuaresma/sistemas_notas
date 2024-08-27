import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TarefaService } from "./service/servico.service";
import { TarefaController } from "./controller/tarefa.controller";
import { Tarefa } from "./entities/tarefa.entity";


@Module ({
    imports: [TypeOrmModule.forFeature([Tarefa])],
    providers: [TarefaService],
    controllers: [TarefaController],
    exports: [TypeOrmModule]
})

export class TarefaModule {}