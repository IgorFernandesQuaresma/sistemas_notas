import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";



@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ){}


    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                tarefa: true,
                
            }
        });   
    }

    async create(usuario: Usuario): Promise<Usuario>{

            let existeUsuario = await this.usuarioRepository.findOne({
                where: {
                    usuario: usuario.usuario, 
                },
            });

            if (existeUsuario) {
                throw new HttpException('Usuário já existe!', HttpStatus.CONFLICT);
            }



        return await this.usuarioRepository.save(usuario);
    }

    async findById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                tarefa: true,
        
            }
            
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findByUsuario(usuario: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where:{
                usuario: ILike(`%${usuario}%`)
            },
            relations: {
                tarefa: true
    
            }
            
        })
    }


    async update(usuario: Usuario): Promise<Usuario> {
        
        let usuarioTarefa = await this.findById(usuario.id);

        if (!usuarioTarefa || !usuario.id)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.usuarioRepository.save(usuario);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let usuarioTarefa = await this.findById(id);

        if (!usuarioTarefa)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return await this.usuarioRepository.delete(id);

    }
}