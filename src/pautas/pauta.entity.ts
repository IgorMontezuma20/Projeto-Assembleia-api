import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  descricao: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro?: Date;

  @Column({ type: 'timestamp', nullable: true })
  abertura?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechamento?: Date;

  getStatus(): string {
    if (this.fechamento && this.fechamento < new Date()) {
      return PautaStatus.ENCERRADA;
    }

    if (this.abertura) {
      return PautaStatus.INICIADA;
    }

    return PautaStatus.NAO_INICIADA;
  }

  public isIniciada(): boolean {
    return this.isInStatus(PautaStatus.INICIADA);
  }

  public isEncerrada(): boolean {
    return this.isInStatus(PautaStatus.ENCERRADA);
  }

  public isPossivelIniciarSessao(): boolean {
    return this.isInStatus(PautaStatus.NAO_INICIADA);
  }

  public isInStatus(verifyStatus: PautaStatus): boolean {
    const status = this.getStatus();
    return status == verifyStatus;
  }
}

enum PautaStatus {
  NAO_INICIADA = 'Sessão Não Iniciada',
  INICIADA = 'Sessão Iniciada',
  ENCERRADA = 'Pauta Encerrada',
}
