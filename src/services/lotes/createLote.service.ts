import {Repository} from "typeorm"
import { AppDataSource } from "../../data-source"
import { Lote } from "../../entities/lotes.entities"
import ILote from "../../interfaces/lote.interfaces"

const createLote = async(requestData:ILote):Promise<Lote> => {

    const loteRepository:Repository<Lote> = AppDataSource.getRepository(Lote)

    const createLote: Lote = loteRepository.create(requestData)

    await loteRepository.save(createLote)

    return createLote


}

export default createLote
