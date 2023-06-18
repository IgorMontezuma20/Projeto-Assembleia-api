import { Inject, Injectable } from '@nestjs/common';
import { Voto } from './voto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotoService {
  constructor(
    @Inject('VOTO_REPOSITORY')
    private readonly votoRepository: Repository<Voto>,
  ) {}
}
