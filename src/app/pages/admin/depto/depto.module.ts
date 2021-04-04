import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptoRoutingModule } from './depto-routing.module';
import { DeptoComponent } from './depto.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [DeptoComponent],
  imports: [
    CommonModule,
    DeptoRoutingModule,
    MaterialModule
  ]
})
export class DeptoModule { }
