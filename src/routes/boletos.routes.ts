import { Router } from "express";
import { getAllBoletosController, getCSVDataController, getPDFDataController } from "../controllers/boletos.controllers";

const boletosRoutes:Router = Router();

boletosRoutes.get("/csv", getCSVDataController)
boletosRoutes.get("/pdf", getPDFDataController)
boletosRoutes.get("", getAllBoletosController)

export default boletosRoutes;