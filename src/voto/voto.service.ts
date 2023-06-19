import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OpcaoVoto, Voto } from './voto.entity';
import { Repository } from 'typeorm';
import { AssociadoService } from './associado/associado.service';
import { Pauta } from 'src/pautas/pauta.entity';
import { Result } from 'src/common/result';
import { Associado } from './associado/associado.entity';
import { HttpError } from 'src/common/httpError';

@Injectable()
export class VotoService {
  constructor(
    @Inject('VOTO_REPOSITORY')
    private readonly votoRepository: Repository<Voto>,
    private readonly associadoService: AssociadoService,
  ) {}

  async registerVote(
    pauta: Pauta,
    cpf: string,
    opcaoVoto: OpcaoVoto,
  ): Promise<Result<Voto, HttpError>> {
    if (!pauta.isIniciada()) {
      return new Result(
        null,
        new HttpError(
          'Pauta não está em sessão',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    }

    const associado: Associado =
      await this.associadoService.recuperarOuCadastrar(cpf);

    const isVotoRegistrado: boolean = await this.existeVotoPara(
      pauta,
      associado,
    );

    if (isVotoRegistrado) {
      return new Result(
        null,
        new HttpError('Voto já registrado anteriormente', HttpStatus.CONFLICT),
      );
    }

    const voto = new Voto();
    voto.associado = associado;
    voto.pauta = pauta;
    voto.opcaoVoto = opcaoVoto;

    await this.votoRepository.save(voto);
    return new Result(voto, null);
  }

  async existeVotoPara(pauta: Pauta, associado: Associado): Promise<boolean> {
    const voto: Voto = await this.votoRepository.findOne({
      where: {
        pauta: {
          id: pauta.id,
        },
        associado: {
          id: associado.id,
        },
      },
    });

    return !!voto;
  }
}
