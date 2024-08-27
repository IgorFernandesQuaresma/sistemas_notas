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
                agendamento: true,
                
            }
        });   
    }

    async create(usuario: Usuario): Promise<Usuario>{
        return await this.usuarioRepository.save(usuario);
    }

    async findById(id: number): Promise<Usuario> {

        let servico = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                agendamento: true,
        
            }
            
        });

        if (!servico)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return servico;
    }

    async findByUsuario(usuario: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where:{
                usuario: ILike(`%${usuario}%`)
            },
            relations: {
                agendamento: true
    
            }
            
        })
    }


    async update(usuario: Usuario): Promise<Usuario> {
        
        let usuarioServico = await this.findById(usuario.id);

        if (!usuarioServico || !usuario.id)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.usuarioRepository.save(usuario);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let usuarioServico = await this.findById(id);

        if (!usuarioServico)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return await this.usuarioRepository.delete(id);

    }
}