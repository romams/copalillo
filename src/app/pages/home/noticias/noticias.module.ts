import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './noticias.component';
import {MatChipsModule} from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [NoticiasComponent],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    MatChipsModule,
    NgxPaginationModule
  ]
})
export class NoticiasModule { }
