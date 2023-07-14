import { Request, Response } from "express";
import getCSVData from "../services/boleto/getCSVData.service";

const getCSVDataController = async (request: Request, response: Response):Promise<Response> => {

    return response.status(200).json(await getCSVData());
}

export { getCSVDataController};


