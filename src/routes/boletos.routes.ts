import { Router } from "express";
import { getCSVDataController } from "../controllers/boletos.controllers";

const boletosRoutes:Router = Router();

boletosRoutes.get("", getCSVDataController)

export default boletosRoutes;