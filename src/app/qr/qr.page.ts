import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  savedScans: any;
  fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private subscription: Subscription;

  constructor(
    private alertController: AlertController,
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/') {
        this.bindData();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  bindData() {
    this.storage.get("savedScans").then((response) => {
      if (response) {
        this.savedScans = response;
      } else {
        this.savedScans = [];
      }
    });
  }

  async scan() {

    let loader = await this.loadingController.create({
      message: "Please wait"
    });

    loader.present();

    this.router.navigate(["qr-scan"]).then(() => {
      loader.dismiss();
    });

  }

  async copy(scannedObject: any, index: number) {
    const alert = await this.alertController.create({
      header: 'Do you want to copy ?',
      message: scannedObject.data,
      buttons: [
        {
          text: 'Copy',
          handler: () => {
            navigator.clipboard.writeText(scannedObject.data);
            this.message("Copied Successfully");
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.showDeleteConfirmation(index);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async showDeleteConfirmation(index: number) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: "You want to delete ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.savedScans.splice(index, 1);
            this.message("Deleted Successfully");
          }
        }
      ]
    });

    await alert.present();
  }

  async message(message: string) {

    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }

  async clearAll() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: "You want to clear all scanned records ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.storage.remove("savedScans").then(() => {
              this.message("Scanned records removed");
              this.savedScans = [];
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
