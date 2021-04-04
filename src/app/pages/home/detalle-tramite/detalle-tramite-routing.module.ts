import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTramiteComponent } from './detalle-tramite.component';

const routes: Routes = [{ path: '', component: DetalleTramiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleTramiteRoutingModule { }
