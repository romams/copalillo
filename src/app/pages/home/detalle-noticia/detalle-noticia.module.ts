import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleNoticiaRoutingModule } from './detalle-noticia-routing.module';
import { DetalleNoticiaComponent } from './detalle-noticia.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [DetalleNoticiaComponent],
  imports: [
    CommonModule,
    DetalleNoticiaRoutingModule,
    MaterialModule,
  ]
})
export class DetalleNoticiaModule { }
