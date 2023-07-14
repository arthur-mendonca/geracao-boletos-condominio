import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Boleto } from './boletos.entities';

  @Entity("lotes")
  export class Lote{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    nome:string; 

    @Column({ type: "boolean", default: true })
    ativo: boolean;

    @CreateDateColumn()
    criado_em:Date;

    @OneToMany(() => Boleto, boleto => boleto.lote)
    boletos: Boleto[];
  }

  