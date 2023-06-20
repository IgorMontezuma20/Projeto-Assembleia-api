import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { ResgistroVotoDTO } from './voto.resource';
import { ErrorResponse } from 'src/common/erro.resource';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('pautas/:id/voto')
@ApiTags('Votos')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votosService: VotoService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Registrar um voto' })
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

    if (result.isError()) {
      const error = result.error;

      return response
        .status(error.statusCode)
        .send(new ErrorResponse(error.message));
    }

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
