import { Request, Response } from "express";
import getCSVData from "../services/boleto/getCSVData.service";
import getPDFData from "../services/boleto/getPDFdata.service";

const getCSVDataController = async (request: Request, response: Response):Promise<Response> => {

    return response.status(200).json(await getCSVData());
}


const getPDFDataController = async (request: Request, response: Response):Promise<Response> => {
    return response.status(200).json(await getPDFData());
}


export { getCSVDataController, getPDFDataController};


