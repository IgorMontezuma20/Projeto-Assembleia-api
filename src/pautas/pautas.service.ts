import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './pauta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}
}
