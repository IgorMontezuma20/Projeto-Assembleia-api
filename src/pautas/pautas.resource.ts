import { IsNotEmpty } from 'class-validator';
import { Pauta } from './pauta.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CriarPautaDTO {
  @IsNotEmpty({ message: 'Descrição é um campo obrigatório!' })
  @ApiProperty({
    name: 'descricao',
    example: 'Votação para aumento de condomínio.',
  })
  descricao: string;
}

export class PautaDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: string;
}
export class NovaSessaoDTO {
  @ApiProperty({ default: 10 })
  minutos: number;
}

export function toDomain(dto: CriarPautaDTO): Pauta {
  const pauta = new Pauta();
  pauta.descricao = dto.descricao;
  return pauta;
}

export function toRepresentation(entity: Pauta): PautaDTO {
  const dto = new PautaDTO();

  dto.id = entity.id;
  dto.descricao = entity.descricao;
  dto.status = entity.getStatus();

  return dto;
}
