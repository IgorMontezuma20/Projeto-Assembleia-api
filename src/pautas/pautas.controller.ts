import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CriarPautaDTO } from './pautas.resource';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautasService: PautasService) {}

  @Post()
  save(@Body() pauta: CriarPautaDTO, @Res() response: Response) {
    return response.status(201).send(pauta);
  }
}
