import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CriarPautaDTO, toDomain } from './pautas.resource';
import { Pauta } from './pauta.entity';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautasService: PautasService) {}

  @Post()
  async save(@Body() pauta: CriarPautaDTO, @Res() response: Response) {
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.pautasService.save(pautaDomain);

    if (result.isError()) {
      return response.status(409).send({
        message: result.error.message,
      });
    }

    return response.status(201).send(result.value);
  }
}
