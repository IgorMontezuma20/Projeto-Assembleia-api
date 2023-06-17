import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CriarPautaDTO, toDomain, toRepresentation } from './pautas.resource';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from 'src/common/erro.resource';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautasService: PautasService) {}

  @Post()
  async save(@Body() pauta: CriarPautaDTO, @Res() response: Response) {
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.pautasService.save(pautaDomain);

    if (result.isError()) {
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }

    return response
      .status(HttpStatus.CREATED)
      .send(toRepresentation(result.value));
  }

  @Get()
  async list(@Res() response: Response) {
    const result = await this.pautasService.findAll();
    return response.status(HttpStatus.OK).send(result.map(toRepresentation));
  }
}
