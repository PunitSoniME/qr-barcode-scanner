import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QrModalComponent } from './qr/qr-modal/qr-modal.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./qr/qr.module').then(m => m.QrPageModule) },
  {
    path: 'qr-scan',
    component: QrModalComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
