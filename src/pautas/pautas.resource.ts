import { Pauta } from './pauta.entity';
export class CriarPautaDTO {
  descricao: string;
}

export class PautaDTO {
  id: string;
  descricao: string;
  status: string;
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
