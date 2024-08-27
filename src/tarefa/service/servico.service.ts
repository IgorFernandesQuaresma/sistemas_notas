import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarefa } from "../entities/tarefa.entity";
import { DeleteResult, ILike, Repository } from "typeorm";



@Injectable()
export class TarefaService{
    constructor(
        @InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ){}


    async findAll(): Promise<Tarefa[]> {
        return await this.tarefaRepository.find({
            relations: {
                usuario: true
    
            }
        });   
    }

    async create(tarefa: Tarefa): Promise<Tarefa>{
        return await this.tarefaRepository.save(tarefa);
    }

    async findById(id: number): Promise<Tarefa> {

        let tarefa = await this.tarefaRepository.findOne({
            where: {
                id
            },
            relations: {
                usuario: true
    
            }
            
        });

        if (!tarefa)
            throw new HttpException('Tarefa não encontrado!', HttpStatus.NOT_FOUND);

        return tarefa;
    }

    async findByTarefa(tarefa: string): Promise<Tarefa[]> {
        return await this.tarefaRepository.find({
            where:{
                tarefa: ILike(`%${tarefa}%`)
            },
            relations: {
                usuario: true
    
            }
            
        })
    }


    async update(tarefa: Tarefa): Promise<Tarefa> {
        
        let buscarTarefa = await this.findById(tarefa.id);

        if (!buscarTarefa || !tarefa.id)
            throw new HttpException('Tarefa não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.tarefaRepository.save(tarefa);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let buscarTarefa = await this.findById(id);

        if (!buscarTarefa)
            throw new HttpException('Tarefa não encontrado!', HttpStatus.NOT_FOUND);

        return await this.tarefaRepository.delete(id);

    }
}