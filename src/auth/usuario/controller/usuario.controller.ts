import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
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
create(@Body() servico: Usuario): Promise<Usuario> {
    return this.usuarioService.create(servico); 
}

}
