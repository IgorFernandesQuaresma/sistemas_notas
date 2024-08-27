import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agendamento } from "../entities/agendamento.entity";
import { Between, DeleteResult, ILike, Repository } from "typeorm";



@Injectable()
export class AgendamentoService{
    constructor(
        @InjectRepository(Agendamento)
        private agendamentoRepository: Repository<Agendamento>
    ){}

    async findAll(): Promise<Agendamento[]> {
        return await this.agendamentoRepository.find({
            relations: {
                servico: true
            }
        });   
    }

    async create(agendamento: Agendamento): Promise<Agendamento>{
        return await this.agendamentoRepository.save(agendamento);
    }


    async findById(id: number): Promise<Agendamento> {

        let agendamento = await this.agendamentoRepository.findOne({
            where: {
                id
            },
            relations: {
                servico: true
            }
           
            
        });

        if (!agendamento)
            throw new HttpException('Agendamento não encontrado!', HttpStatus.NOT_FOUND);

        return agendamento;
    }


    //corrigir esse buscar por hora
    

    async findByData(data: Date): Promise<Agendamento[]> {
        const dataInicio = new Date(data);
        const dataFim = new Date(data);

        
        dataInicio.setHours(0, 0, 0, 0);

        dataFim.setHours(23, 59, 59, 999);
    
        return await this.agendamentoRepository.find({
            where: {
                data: Between(dataInicio, dataFim),
            },
            relations: {
                servico: true
            }
        
        });
    }


    async update(agendamento: Agendamento): Promise<Agendamento> {
        
        let buscarAgendamento = await this.findById(agendamento.id);

        if (!buscarAgendamento || !agendamento.id)
            throw new HttpException('Agendamento não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.agendamentoRepository.save(agendamento);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let buscarAgendamento = await this.findById(id);

        if (!buscarAgendamento)
            throw new HttpException('Agendamento não encontrado!', HttpStatus.NOT_FOUND);

        return await this.agendamentoRepository.delete(id);

    }
}