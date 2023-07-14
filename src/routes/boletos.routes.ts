import { Router } from "express";
import { getCSVDataController, getPDFDataController } from "../controllers/boletos.controllers";

const boletosRoutes:Router = Router();

boletosRoutes.get("/csv", getCSVDataController)
boletosRoutes.get("/pdf", getPDFDataController)

export default boletosRoutes;