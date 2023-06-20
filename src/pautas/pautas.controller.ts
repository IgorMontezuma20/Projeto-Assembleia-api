import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Param,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CriarPautaDTO,
  NovaSessaoDTO,
  toDomain,
  toRepresentation,
} from './pautas.resource';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from 'src/common/erro.resource';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('pautas')
@ApiTags('Pautas')
export class PautasController {
  private readonly logger = new Logger(PautasController.name);

  constructor(private readonly pautasService: PautasService) {}

  @Post()
  @ApiOperation({ description: 'Criar uma Pauta' })
  async save(@Body() pauta: CriarPautaDTO, @Res() response: Response) {
    this.logger.log('Criando nova pauta');

    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.pautasService.save(pautaDomain);

    if (result.isError()) {
      this.logger.error('Erro ao criar nova pauta: ' + result.error.message);
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }

    this.logger.log('Pauta cadastrada comm sucesso: ' + pauta.descricao + '.');
    return response
      .status(HttpStatus.CREATED)
      .send(toRepresentation(result.value));
  }

  @Get()
  @ApiOperation({ description: 'Listar todas as Pautas' })
  async list(@Res() response: Response) {
    const result = await this.pautasService.findAll();
    return response.status(HttpStatus.OK).send(result.map(toRepresentation));
  }

  @Post(':id/sessao')
  @ApiOperation({ description: 'Criar uma sessão' })
  async createSession(
    @Param('id') id: string,
    @Body() novaSessaoDto: NovaSessaoDTO,
    @Res() response: Response,
  ) {
    const pauta: Pauta = await this.pautasService.findById(id);
    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse('Pauta não encontrada.'));
    }

    const sucesso = await this.pautasService.startSession(
      pauta,
      novaSessaoDto.minutos,
    );

    if (!sucesso) {
      const errorResponse =
        'Não foi possíviel iniciar a sessão para esta pauta. Sua sessão já foi INICIADA ou ENCERRADA.';
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(errorResponse));
    }

    return response.status(HttpStatus.OK).send();
  }
}
