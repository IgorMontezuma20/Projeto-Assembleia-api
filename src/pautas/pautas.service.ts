import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './pauta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  async save(pauta: Pauta): Promise<Pauta> {
    const descricao = pauta.descricao;

    const possivelPauta = await this.pautaRepository.findOne({
      where: {
        descricao: descricao,
      },
    });

    if (possivelPauta) {
      throw Error('Pauta existente.');
    }

    pauta = await this.pautaRepository.save(pauta);
    return pauta;
  }
}
