import fs from 'fs';
import path from 'path';
import PdfParse from "pdf-parse";
import { AppDataSource } from '../../data-source';
import { Boleto } from '../../entities/boletos.entities';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfLocalPath = path.join(__dirname, '../../../boletos.pdf');

const getPDFData = async () => {
    const boletoRepo = AppDataSource.getRepository(Boleto)

    const dataBuffer = fs.readFileSync(pdfLocalPath);
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    }
    const printer = new PdfPrinter(fonts);

    const parsedPDF = await PdfParse(dataBuffer).then( async data => {
    const names = data.text.replace(/\n/g, "").split(" ").filter(name => name !== "");
        for (let name of names){
            name.trim()
            try {
                const boletos = await boletoRepo.find()
                boletos.forEach(boleto => {
                    if(boleto.nome_sacado.includes(name)){
                        const docDefinition:TDocumentDefinitions = {
                            defaultStyle:{
                                fontSize:12,
                                font: "Helvetica"
                            },
                            content:[
                                {text: `Nome: ${boleto.nome_sacado}`},
                                {text: `Valor: ${boleto.valor}`},
                                {text: `Linha digitável: ${boleto.linha_digitavel}`}
                            ]
                        };
                        const pdfDoc = printer.createPdfKitDocument(docDefinition);
                        pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, `../../../${boleto.id}.pdf`)));
                        pdfDoc.end();
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