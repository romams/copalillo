import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarRoutingModule } from './buscar-routing.module';
import { BuscarComponent } from './buscar.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [BuscarComponent],
  imports: [
    CommonModule,
    BuscarRoutingModule,
    NgxPaginationModule
  ]
})
export class BuscarModule { }
