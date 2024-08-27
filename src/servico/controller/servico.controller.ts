import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ServicoService } from "../service/servico.service";
import { Servico } from "../entities/servico.entity";



@Controller('/servicos') 
export class ServicoController {
    constructor (private readonly servicoService: ServicoService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Servico[]> {
    return this.servicoService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() servico: Servico): Promise<Servico> {
    return this.servicoService.create(servico); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() servico: Servico): Promise<Servico> {
    return this.servicoService.update(servico); 
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Servico> {
    return this.servicoService.findById(id);
}

@Get('/servicos/:servico')
@HttpCode(HttpStatus.OK)
findBydescricao(@Param('servico') servico: string): Promise<Servico[]> {
    return this.servicoService.findByServico(servico);         
}

@Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.servicoService.delete(id);
  }







}


