import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";




@Controller('/usuarios') 
export class UsuarioController {
    constructor (private readonly usuarioService: UsuarioService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() tarefa: Usuario): Promise<Usuario> {
    return this.usuarioService.create(tarefa); 
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario); 
}

}
