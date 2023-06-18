import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associado } from './associado.entity';

@Injectable()
export class AssociadoService {
  constructor(
    @Inject('ASSOCIADO_REPOSITORY')
    private readonly associadoRepository: Repository<Associado>,
  ) {}
}
