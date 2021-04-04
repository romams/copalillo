import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasComponent } from './noticias.component';

const routes: Routes = [
  { path: '', component: NoticiasComponent },
  { path: 'detalle/:id', loadChildren: () => import('./../detalle-noticia/detalle-noticia.module').then(m => m.DetalleNoticiaModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
