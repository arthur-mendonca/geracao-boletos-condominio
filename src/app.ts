import "reflect-metadata"
import express, {Application} from "express"
import boletosRoutes from "./routes/boletos.routes"
import lotesRoutes from "./routes/lotes.routes"
import { handleErrors } from "./errors"


const app: Application = express()

app.use(express.json())

app.use("/boleto",boletosRoutes)
app.use("/lote",lotesRoutes)


app.use(handleErrors)

export default app