
import { AppDataSource } from "../boleto/../../data-source";
import {Boleto} from "../boleto/../../entities/boletos.entities"
import csv from 'csv-parser';
import fs from 'fs';



const getCSVData = async():Promise<void> => {

const boletoRepo = AppDataSource.getRepository("Boleto")

fs.createReadStream("./boletos.csv")
  .pipe(csv({separator: ";"}))
  .on("data", async (row) => {
    const boleto = new Boleto();
    boleto.nome_sacado = row.nome;
    boleto.lote = row.unidade;
    boleto.valor = row.valor;
    boleto.linha_digitavel = row.linha_digitavel;

    await boletoRepo.save(boleto)
    
  }).on("end", () => {
    
   return console.log("CSV file successfully processed")})
    
}

export default getCSVData;