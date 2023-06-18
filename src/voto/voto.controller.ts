import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { ResgistroVotoDTO } from './voto.resource';

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
    @Res() Response: Response,
  ) {
    return Response.status(HttpStatus.ACCEPTED).send();
  }
}
