import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/servico.service";



@Controller('/tarefas') 
export class TarefaController {
    constructor (private readonly tarefaService: TarefaService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Tarefa[]> {
    return this.tarefaService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.tarefaService.create(tarefa); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.tarefaService.update(tarefa); 
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa> {
    return this.tarefaService.findById(id);
}


 // exemplificando o que é passado nesse get no http: basicamente passa o caminho do controller /tarefas
 // depois o caminho do get /tarefa e por ultimo o parametro /:tarefa (que vai ser o nome da tarefa)

@Get('/tarefa/:tarefa')
@HttpCode(HttpStatus.OK)
findByTarefa(@Param('tarefa') tarefa: string): Promise<Tarefa[]> {
    return this.tarefaService.findByTarefa(tarefa);         
}

@Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.tarefaService.delete(id);
  }







}


