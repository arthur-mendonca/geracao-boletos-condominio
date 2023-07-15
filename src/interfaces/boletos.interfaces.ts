import { Lote } from "../entities/lotes.entities";

export interface IBoleto {
    id: number;
    nome_sacado: string;
    valor: number;
    lote: Lote;
    linha_digitavel: string;
    ativo: boolean;
    criado_em: Date;
}