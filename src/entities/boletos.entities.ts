import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';

  import { Lote } from './lotes.entities';

  @Entity("boletos")
  export class Boleto{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    nome_sacado: string;

    @Column({type: "decimal", precision:5, scale:2})
    valor: number;

    @ManyToOne(() => Lote, lote => lote.boletos)
    @JoinColumn({name: "id_lote"})
    lote: Lote;

    @Column({type: "varchar", length: 255})
    linha_digitavel: string;

    @Column({type: "boolean", default: true})
    ativo: boolean; 

    @CreateDateColumn()
    criado_em:Date;
    }

    