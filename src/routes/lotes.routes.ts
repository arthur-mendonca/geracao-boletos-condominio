import { Router } from "express";
import createLoteController from "../controllers/lotes.controllers";
const lotesRoutes:Router = Router();

lotesRoutes.post("", createLoteController)

export default lotesRoutes;