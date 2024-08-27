import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Servico } from "../entities/servico.entity";
import { DeleteResult, ILike, Repository } from "typeorm";



@Injectable()
export class ServicoService{
    constructor(
        @InjectRepository(Servico)
        private servicoRepository: Repository<Servico>
    ){}


    async findAll(): Promise<Servico[]> {
        return await this.servicoRepository.find({
            relations: {
                agendamento: true
            }
        });   
    }

    async create(servico: Servico): Promise<Servico>{
        return await this.servicoRepository.save(servico);
    }

    async findById(id: number): Promise<Servico> {

        let servico = await this.servicoRepository.findOne({
            where: {
                id
            },
            relations: {
                agendamento: true
            }
            
        });

        if (!servico)
            throw new HttpException('Servico não encontrado!', HttpStatus.NOT_FOUND);

        return servico;
    }

    async findByServico(servico: string): Promise<Servico[]> {
        return await this.servicoRepository.find({
            where:{
                servico: ILike(`%${servico}%`)
            },
            relations: {
                agendamento: true
            }
            
        })
    }


    async update(servico: Servico): Promise<Servico> {
        
        let buscarServico = await this.findById(servico.id);

        if (!buscarServico || !servico.id)
            throw new HttpException('Servico não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.servicoRepository.save(servico);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let buscarServico = await this.findById(id);

        if (!buscarServico)
            throw new HttpException('Servico não encontrado!', HttpStatus.NOT_FOUND);

        return await this.servicoRepository.delete(id);

    }
}