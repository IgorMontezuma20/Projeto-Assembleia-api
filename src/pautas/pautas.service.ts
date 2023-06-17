import { Inject, Injectable } from '@nestjs/common';
import { Pauta } from './pauta.entity';
import { Repository } from 'typeorm';
import { Result } from 'src/common/result';

@Injectable()
export class PautasService {
  static TEMPO_PADRAO_PAUTA = 10;

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

  async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }

  async startSession(
    pauta: Pauta,
    minutos: number = PautasService.TEMPO_PADRAO_PAUTA,
  ): Promise<boolean> {
    if (!pauta.isPossivelIniciarSessao) {
      return false;
    }

    pauta.abertura = new Date();
    pauta.fechamento = new Date(pauta.abertura.getTime() + minutos * 60000);

    await this.pautaRepository.update(pauta.id, pauta);

    return true;
  }

  async findById(id: string): Promise<Pauta> {
    return await this.pautaRepository.findOneBy({
      id: id,
    });
  }
}
