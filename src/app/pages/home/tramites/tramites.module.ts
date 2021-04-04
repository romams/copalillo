import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesRoutingModule } from './tramites-routing.module';
import { TramitesComponent } from './tramites.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [TramitesComponent],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    MaterialModule
  ]
})
export class TramitesModule { }
