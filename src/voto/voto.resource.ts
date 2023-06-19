import { IsIn, IsNotEmpty } from 'class-validator';
import { OpcaoVoto } from './voto.entity';

export class ResgistroVotoDTO {
  @IsNotEmpty({ message: 'Campo CPF é obrigatório!' })
  cpf: string;

  @IsNotEmpty({ message: 'Campo OPÇÃO DE VOTO é obrigatório!' })
  @IsIn([OpcaoVoto.NAO, OpcaoVoto.SIM], {
    message: 'A Opção de voto deve ser: SIM ou NÃO.',
  })
  opcaoVoto: OpcaoVoto;
}
