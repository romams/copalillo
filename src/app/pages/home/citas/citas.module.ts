import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CitasComponent],
  imports: [
    CommonModule,
    CitasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CitasModule { }
