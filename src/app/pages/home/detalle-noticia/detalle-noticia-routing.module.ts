import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleNoticiaComponent } from './detalle-noticia.component';

const routes: Routes = [
  { 
    path: '', component: DetalleNoticiaComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleNoticiaRoutingModule { }
