import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoModule } from './servico/servico.module';
import { Servico } from './servico/entities/servico.entity';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { Agendamento } from './agendamento/entities/agendamento.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './auth/usuario/entities/usuario.entity';
import { UsuarioModule } from './auth/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '16121995',
      database: 'db_agendamento',
      entities: [Servico, Agendamento, Usuario],
      synchronize: true,
    }),
    ServicoModule,
    AgendamentoModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
