import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votoProviders } from './voto.providers';
import { VotoService } from './voto.service';
import { AssociadoService } from './associado/associado.service';

@Module({
  controllers: [VotoController],
  imports: [DatabaseModule],
  providers: [...votoProviders, VotoService, AssociadoService],
})
export class VotoModule {}
