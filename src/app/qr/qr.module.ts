import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { ReversePipe, ReversePipesModule } from './../../pipes/reverse-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReversePipesModule,
    QrPageRoutingModule
  ],
  declarations: [QrPage]
})
export class QrPageModule { }
