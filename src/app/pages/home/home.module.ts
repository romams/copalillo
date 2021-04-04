import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '@app/material.module';
import { CitasModalComponent } from './components/citas-modal/citas-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, CitasModalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
