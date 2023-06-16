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
    const pautaSalva = await this.pautasService.save(pautaDomain);

    return response.status(201).send(pautaSalva);
  }
}
