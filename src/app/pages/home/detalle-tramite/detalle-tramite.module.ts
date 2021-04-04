import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleTramiteRoutingModule } from './detalle-tramite-routing.module';
import { DetalleTramiteComponent } from './detalle-tramite.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [DetalleTramiteComponent],
  imports: [
    CommonModule,
    DetalleTramiteRoutingModule,
    MaterialModule
  ]
})
export class DetalleTramiteModule { }
