import { Repository , MoreThanOrEqual, LessThanOrEqual, Between} from "typeorm";
import { AppDataSource } from "../../data-source";
import { Boleto } from "../../entities/boletos.entities";
import { IBoleto, IQueryParams, IWhereCondition } from "../../interfaces/boletos.interfaces";


const getAllBoletos = async (params:IQueryParams): Promise<IBoleto[]> => {
  const boletoRepo: Repository<Boleto> = AppDataSource.getRepository(Boleto);

  const where: IWhereCondition = {}
  if (params.nome){
    where.nome_sacado = params.nome;
  }
  if (params.valor_inicial && params.valor_final){
    where.valor = Between(Number(params.valor_inicial), Number(params.valor_final));
  } else if (params.valor_inicial) {
    where.valor = MoreThanOrEqual(Number(params.valor_inicial));
  } else if (params.valor_final){
    where.valor = LessThanOrEqual(Number(params.valor_final));
  }
  if(params.id_lote){
    where.lote = {id: Number(params.id_lote)};
  }

  const boletos: Boleto[] = await boletoRepo.find({ where, relations:{lote:true}});

  return boletos;
}

export default getAllBoletos;


