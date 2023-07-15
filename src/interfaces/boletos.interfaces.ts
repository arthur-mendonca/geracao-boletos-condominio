import { Lote } from "../entities/lotes.entities";
import { MoreThanOrEqual, LessThanOrEqual, Between} from "typeorm";


export interface IBoleto {
    id: number;
    nome_sacado: string;
    valor: number;
    lote: Lote;
    linha_digitavel: string;
    ativo: boolean;
    criado_em: Date;
}

export interface IQueryParams {
    nome?: string;
    valor_inicial?: string;
    valor_final?: string;
    id_lote?: string;
    relatorio?: number;
  }

export interface IWhereCondition {
    nome_sacado?: string;
    valor?: MoreThanOrEqual<number> | LessThanOrEqual<number> | Between<number>;
    lote?: {
      id: number;
    };
  }


export interface ITableBody {
  id: number;
  nome_sacado: string,
  valor: string,
  linha_digitavel: string
  lote: number;
}