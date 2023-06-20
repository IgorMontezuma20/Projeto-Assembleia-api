import { IsIn, IsNotEmpty } from 'class-validator';
import { OpcaoVoto } from './voto.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResgistroVotoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo CPF é obrigatório!' })
  cpf: string;

  @IsNotEmpty({ message: 'Campo OPÇÃO DE VOTO é obrigatório!' })
  @IsIn([OpcaoVoto.NAO, OpcaoVoto.SIM], {
    message: 'A Opção de voto deve ser: SIM ou NÃO.',
  })
  @ApiProperty({ example: 'SIM ou NAO' })
  opcaoVoto: OpcaoVoto;
}
