import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { ResgistroVotoDTO } from './voto.resource';
import { ErrorResponse } from 'src/common/erro.resource';

@Controller('pautas/:id/voto')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votosService: VotoService,
  ) {}

  @Post()
  async registerVote(
    @Param('id') pautaId: string,
    @Body() registroVotoDTO: ResgistroVotoDTO,
    @Res() response: Response,
  ) {
    const pauta = await this.pautasService.findById(pautaId);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse('Pauta não encontrada.'));
    }

    const result = await this.votosService.registerVote(
      pauta,
      registroVotoDTO.cpf,
      registroVotoDTO.opcaoVoto,
    );

    //if (result.isError()) {
    //  return response.status().send(new ErrorResponse(''));
    //}

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
