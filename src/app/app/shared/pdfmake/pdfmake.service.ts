import { Inject, Injectable } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import PDFMake from 'pdfmake/build/pdfmake';
type PDFMake = typeof import('pdfmake/build/pdfmake');

@Injectable({ providedIn: 'root' })
export class PDFService {
    constructor(
     
    ) { }
    private pdfMake!: PDFMake;
    private fonts!: { [file: string]: string };

    async loadPDFMaker() {
        if (!this.pdfMake) {
            this.pdfMake = await import('pdfmake/build/pdfmake');
            //@ts-ignore
            this.fonts = (await import('pdfmake/build/vfs_fonts'))?.vfs;
        }
    }

    async open(def: TDocumentDefinitions) {
        if (!this.pdfMake) {
            try {
                await this.loadPDFMaker();
            } catch (error) {
                console.error("Failed to load pdf maker lib");
            }
        }
        this.pdfMake.createPdf(def,undefined, undefined, this.fonts).open();
    }


    async download(def: TDocumentDefinitions) {
    if (!this.pdfMake) {
        try {
            await this.loadPDFMaker();
        } catch (error) {
            console.error("Failed to load pdf maker lib");
        }
    }
    this.pdfMake.createPdf(def, undefined, undefined, this.fonts).download();
}

   async print(def: TDocumentDefinitions) {
    if (!this.pdfMake) {
        try {
            await this.loadPDFMaker();
        } catch (error) {
            console.error("Failed to load pdf maker lib");
        }
    }
    this.pdfMake.createPdf(def, undefined, undefined, this.fonts).print();
}
}