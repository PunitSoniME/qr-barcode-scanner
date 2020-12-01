import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
    selector: 'qr-modal',
    templateUrl: './qr-modal.component.html',
    styleUrls: ['./qr-modal.page.scss'],
})

export class QrModalComponent implements OnInit {

    barcodeFormat = BarcodeFormat;
    scannedResult;
    savedScans = [];
    formats = [
        "AZTEC",
        "CODABAR",
        "CODE_39",
        "CODE_93",
        "CODE_128",
        "DATA_MATRIX",
        "EAN_8",
        "EAN_13",
        "ITF",
        "MAXICODE",
        "PDF_417",
        "QR_CODE",
        "RSS_14",
        "RSS_EXPANDED",
        "UPC_A",
        "UPC_E",
        "UPC_EAN_EXTENSION"
    ];
    @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;

    constructor(
        private storage: Storage,
        private modalController: ModalController,
        private toastController: ToastController,
        private router: Router
    ) {
    }

    ngOnInit() {

    }

    clearResult(): void {
        this.scannedResult = null;
    }

    onCodeResult(resultString: string) {
        this.scannedResult = resultString;
    }

    async ngAfterViewInit() {

        this.scanner.scanComplete.subscribe((result) => {
            if (result) {
                this.scannedResult = result.text;
                if (this.barcodeFormat[result.format] == "QR_CODE") {
                    this.addInScanList(this.scannedResult, "qr");
                }
                else {
                    this.addInScanList(this.scannedResult, "barcode");
                }

                console.log(result);
            }
        });


        // this.scanner.scanSuccess.subscribe((e) => {
        //     console.log("success");
        //     //this.scanner
        //     if (e) {
        //         console.log(e);
        //         // this.scannedResult = resultString;
        //         // this.addInScanList(resultString);
        //     }
        // });


        this.storage.get("savedScans").then((response) => {
            if (response) {
                this.savedScans = response;
            } else {
                this.savedScans = [];
            }
        });
    }

    async addInScanList(data: any, format: string) {

        const date = new Date();

        this.savedScans.push({
            icon: format == 'qr' ? 'qr-code-outline' : 'barcode-outline',
            data: data,
            date: date
        });

        this.storage.set("savedScans", this.savedScans);
    }

    async message(message: string) {

        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });

        toast.present();
    }

    save() {
        this.modalController.dismiss(true);
    }

    back() {
        this.router.navigate(["/"]);
    }

    copy() {
        navigator.clipboard.writeText(this.scannedResult);
        this.message("Copied Successfully");
    }

    scanNew() {
        this.scannedResult = null;
    }

    ngOnDestroy() {
        this.scannedResult = null;
    }
}