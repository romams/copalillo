import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeptoComponent } from './depto.component';

const routes: Routes = [{ path: '', component: DeptoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptoRoutingModule { }
