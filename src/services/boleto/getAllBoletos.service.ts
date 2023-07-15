import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Boleto } from "../../entities/boletos.entities";
import { IBoleto } from "../../interfaces/boletos.interfaces";

const getAllBoletos = async (): Promise<IBoleto[]> => {
  const boletoRepo: Repository<Boleto> = AppDataSource.getRepository(Boleto);

  const boletos: Boleto[] = await boletoRepo.find({relations:{lote:true}});

  return boletos;
}

export default getAllBoletos;


