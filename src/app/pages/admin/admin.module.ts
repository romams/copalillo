import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { NewModalComponent } from './components/new-modal/new-modal.component';
import { ProcedureModalComponent } from './components/procedure-modal/procedure-modal.component';
import { DeptoModalComponent } from './components/depto-modal/depto-modal.component';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';


@NgModule({
  declarations: [AdminComponent, ModalComponent, CategoryModalComponent, NewModalComponent, ProcedureModalComponent, DeptoModalComponent, CitaDetailComponent, ConfirmDialogComponent, ContactModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
