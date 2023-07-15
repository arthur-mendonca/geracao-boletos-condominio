import { Repository , MoreThanOrEqual, LessThanOrEqual, Between} from "typeorm";
import { AppDataSource } from "../../data-source";
import { Boleto } from "../../entities/boletos.entities";
import { IBoleto, IQueryParams, ITableBody, IWhereCondition } from "../../interfaces/boletos.interfaces";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs';
import path from 'path';
import { Response, response } from "express";

let reponse:Response

const fonts = {
  Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
  }
}

const printer = new PdfPrinter(fonts);

const getAllBoletos = async (params:IQueryParams): Promise<IBoleto[] | undefined> => {
  try{
  const boletoRepo: Repository<Boleto> = AppDataSource.getRepository(Boleto);

  if(params.relatorio?.toString() === "1"){
    let retornarBoletos = await boletoRepo.find({relations:{lote:true}});
    const body: ITableBody[]= []

    retornarBoletos.forEach((boleto)=>{
      body.push({
        id: boleto.id,
        nome_sacado: boleto.nome_sacado,
        valor: boleto.valor.toString(),
        linha_digitavel: boleto.linha_digitavel, 
        lote: boleto.lote.id
      })
      const docDefinition:TDocumentDefinitions = {
        defaultStyle:{
          fontSize:12,
          font: "Helvetica"
        },
        content: [
          {
            table:{
              body: body.map(row => [row.id.toString(), row.nome_sacado, row.valor, row.linha_digitavel, row.lote] )
            }
          }
        ]
      };
      const pdfPath = path.join(__dirname, `../../../relatorio.pdf`);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(pdfPath));
      pdfDoc.end();
    })
  }
  
  const where: IWhereCondition = {}
  if (params.nome){
    where.nome_sacado = params.nome;
  }
  if (params.valor_inicial && params.valor_final){
    where.valor = Between(Number(params.valor_inicial), Number(params.valor_final));
  } else if (params.valor_inicial) {
    where.valor = MoreThanOrEqual(Number(params.valor_inicial));
  } else if (params.valor_final){
    where.valor = LessThanOrEqual(Number(params.valor_final));
  }
  if(params.id_lote){
    where.lote = {id: Number(params.id_lote)};
  }

  const boletos: Boleto[] = await boletoRepo.find({ where, relations:{lote:true}});

  return boletos;
  }
  catch(error){
  console.log(error)
  }
}

export default getAllBoletos;


