import * as fs from 'node:fs';
import path from 'path';
import PdfParse from "pdf-parse";
import { AppDataSource } from '../../data-source';
import { Boleto } from '../../entities/boletos.entities';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;



const pdfLocalPath = path.join(__dirname, '../../../boletos.pdf');



const getPDFData = async () => {
    const boletoRepo = AppDataSource.getRepository(Boleto)

    

    const dataBuffer = fs.readFileSync(pdfLocalPath);

    const parsedPDF = await PdfParse(dataBuffer).then( async data => {

        const names = data.text.replace(/\n/g, "").split(" ").filter(name => name !== "");
        
        for (let name of names){
            name.trim()

            try {
                const boletos = await boletoRepo.find()
                boletos.forEach(boleto => {
                    if(boleto.nome_sacado.includes(name)){
                        let docDefinition = {
                            content:[
                                `Nome: ${boleto.nome_sacado}`,
                                 `Valor: ${boleto.valor}`,
                                 `Linha digitável: ${boleto.linha_digitavel}`
                            ], defaultStyle:{
                                fontSize:12,
                                font: "Roboto"
                            }
                            
                        };
                        let pdfPath = path.join(__dirname, `../../../${boleto.id}.pdf`);
                        let pdfDoc = pdfMake.createPdf(docDefinition);

                        let writeStream = fs.createWriteStream(pdfPath);
                        pdfDoc.getBuffer(buffer => {
                            writeStream.write( new Buffer("buffer", "base64"));
                            writeStream.end();
                            console.log(pdfPath)
                        })
                    }}
                )
            } catch (error) {
                console.log(error)
            }

        }

    }
    )

    return parsedPDF
}

export default getPDFData;