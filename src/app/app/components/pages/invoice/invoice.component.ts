import { DatePipe, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArrayserviceService } from 'src/app/shared/arrayservice/arrayservice.service';
import { DashboardService } from 'src/app/shared/dashboard/dashboard.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { PaymentsService } from 'src/app/shared/payments/payments.service';
import { resumesService } from 'src/app/shared/resume/resume.service';
import pdfMake from "pdfmake/build/pdfmake";
import { PDFService } from 'src/app/shared/pdfmake/pdfmake.service';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// declare type pdfMake = typeof pdfMake;
// declare type pdfFonts = typeof pdfFonts;
// declare type (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// type PDFMake = typeof import('pdfmake/build/pdfmake');
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, AfterViewInit, OnDestroy{
  resumeAIResponse: any;
  paymentdetails: any;
  cus_details!: any;
  usagechecking!: any;
  constructor(


    private router: Router,
    public dialog: MatDialog,
    private resumeserv: resumesService,
    private localStorage: LocalstorageService,
    private arrayserv: ArrayserviceService,
    private payServ: PaymentsService,
    private dashboardServ: DashboardService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private datepipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef,
    private pdfserv: PDFService,
    
  ) {
    if (isPlatformBrowser(this.platformId)) {
    // const localdata: any = JSON.stringify(this.localStorage.getItem('AIresumeResponse'));
    // this.resumeAIResponse = JSON.parse(JSON.parse(localdata));
      // (<any>pdfMake).addVirtualFileSystem(pdfFonts);
      // this.fonts = pdfFonts.pdfMake.vfs;
  }
}

ngOnInit(): void {
 
}
ngOnDestroy(): void {
  if (isPlatformBrowser(this.platformId)) {
    // this.usagechecking.unsubscribe();
}
}
 
ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.invoiceGen('');
    this.changeDetectorRef.detectChanges();
  }
}


async invoiceGen(action:string=''){

  if (isPlatformBrowser(this.platformId)) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA")
    const data:any = this.localStorage.getItem('logindetails');
    let cus_details: any = JSON.parse(data);
    this.cus_details = cus_details;
    setTimeout(()=>{
    this.usagechecking =  this.payServ.usagecheck(cus_details?.u_id)
        .subscribe((res: any) => {
          console.log(res, "payment details 11111111111111");
          this.paymentdetails = res.data;
          if (action) {
            let docDefinition: any = {
              content: [
                {
                  text: 'KAAMRESUME',
                  fontSize: 16,
                  alignment: 'center',
                  color: '#047886'
                },
                {
                  text: 'INVOICE',
                  fontSize: 20,
                  bold: true,
                  alignment: 'center',
                  decoration: 'underline',
                  color: 'skyblue'
                },
                {
                  text: 'Customer Details',
                  style: 'sectionHeader'
                },
                {
                  columns: [
                    [
                      {
                        text: cus_details?.name,
                        bold: true
                      },
                      // { text: this.invoice.address },
                      { text: cus_details?.email },
                      // { text: this.invoice.contactNo }
                    ],
                    [
                      {
                        text: `Date: ${this.datepipe.transform(this.paymentdetails?.created_at, "dd-MM-YYYY (hh:mm)")}`,
                        alignment: 'right'
                      },
                      {
                        text: `Bill No : ${this.paymentdetails?.payments_id}`,
                        alignment: 'right'
                      },
                      {
                        text: `Plan Name : ${this.paymentdetails?.plan_name}`,
                        alignment: 'right'
                      }
                    ]
                  ]
                },
                {
                  text: 'Order Details',
                  style: 'sectionHeader'
                },
                {
                  table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto', 'auto'],
                    body: [
                      ['Product', 'Price', 'Quantity', 'Amount'],
                      // ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
                      // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
                      [this.paymentdetails?.plan_name, this.paymentdetails?.cost, 1, this.paymentdetails?.cost],
                      [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.paymentdetails?.cost.toFixed(2)]
                    ]
                  }
                },
                {
                  text: 'Note from us:',
                  style: 'sectionHeader'
                },
                {
                  text: `We wish you best of luck for your job search. May Gods guiding hand land you under a good boss.`,
                  margin: [0, 0, 0, 15]
                },
                {
                  columns: [
                    [{ qr: `${cus_details?.name}`, fit: '50' }],
                    [{ text: 'Signature', alignment: 'right', italics: true }],
                  ]
                },
                {
                  text: 'Terms and Conditions',
                  style: 'sectionHeader'
                },
                {
                  ul: [

                    "The product is subject to the KAAMRESUME's terms and conditions.",
                    "This is system generated invoice.",
                  ],
                }
              ],
              styles: {
                sectionHeader: {
                  bold: true,
                  decoration: 'underline',
                  fontSize: 14,
                  margin: [0, 15, 0, 15]
                }
              }
            };
            if (action === 'download') {
              // this.pdfMake.createPdf(docDefinition).download();
              this.pdfserv.download(docDefinition);
            } else if (action === 'print') {
            //  this.pdfMake.createPdf(docDefinition).print();
              this.pdfserv.print(docDefinition);
            } else if ('open') {
            //  this.pdfMake.createPdf(docDefinition).open();
            this.pdfserv.open(docDefinition);
            } else {
              console.log('no command for invoice');
            }
          }
        });
      this.changeDetectorRef.detectChanges();
    },1500);
   
  }

}
}
