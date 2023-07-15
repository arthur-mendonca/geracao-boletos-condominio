import createLote from "../services/lotes/createLote.service";
import { Request, Response } from "express";

const createLoteController = async (request: Request, response: Response):Promise<Response> => {
    const requestData = request.body
    const lote = await createLote(requestData)
    return response.status(201).json(lote)
}


export default createLoteController