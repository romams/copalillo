import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [ProceduresComponent],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    MaterialModule
  ]
})
export class ProceduresModule { }
