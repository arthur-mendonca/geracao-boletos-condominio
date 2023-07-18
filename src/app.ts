import "reflect-metadata"
import express, {Application} from "express"
import boletosRoutes from "./routes/boletos.routes"
import lotesRoutes from "./routes/lotes.routes"
import { handleErrors } from "./errors"
require("express-async-errors")

const app: Application = express()

app.use(express.json())

app.use("/boletos",boletosRoutes)
app.use("/lote",lotesRoutes)


app.use(handleErrors)

export default app