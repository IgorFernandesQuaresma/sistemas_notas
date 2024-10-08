import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';
import { Bcrypt } from '../auth/bcrypt/bcrypt';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [TypeOrmModule],
})
export class UsuarioModule {}