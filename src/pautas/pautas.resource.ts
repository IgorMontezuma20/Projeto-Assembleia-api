import { Pauta } from './pauta.entity';
export class CriarPautaDTO {
  descricao: string;
}

export function toDomain(dto: CriarPautaDTO): Pauta {
  return {
    descricao: dto.descricao,
  };
}
