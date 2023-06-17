import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './pauta.entity';
import { Repository } from 'typeorm';
import { Result } from 'src/common/result';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  async save(pauta: Pauta): Promise<Result<Pauta>> {
    const descricao = pauta.descricao;

    const possivelPauta = await this.pautaRepository.findOne({
      where: {
        descricao: descricao,
      },
    });

    if (possivelPauta) {
      return new Result(null, new Error('Pauta existente'));
    }

    pauta = await this.pautaRepository.save(pauta);
    return new Result(pauta, null);
  }
}
