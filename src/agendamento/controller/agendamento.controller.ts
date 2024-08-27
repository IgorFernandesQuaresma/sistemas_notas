import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import { AgendamentoService } from "../service/agendamento.service";
import { Agendamento } from "../entities/agendamento.entity";




@Controller('/agendamentos') 
export class AgendamentoController {
    constructor (private readonly agendamentoService: AgendamentoService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Agendamento[]> {
    return this.agendamentoService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() agendamento: Agendamento): Promise<Agendamento> {
    return this.agendamentoService.create(agendamento); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() agendamento: Agendamento): Promise<Agendamento> {
    return this.agendamentoService.update(agendamento); 
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Agendamento> {
    return this.agendamentoService.findById(id);
}

@Get('/data/:data')
@HttpCode(HttpStatus.OK)
findByHora(@Param('data') data: string): Promise<Agendamento[]> {
    const dataConvertida = new Date(data);
    return this.agendamentoService.findByData(dataConvertida);
}

@Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.agendamentoService.delete(id);
  }




}
