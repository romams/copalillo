import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'notFound', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }, 
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) 
  }, 
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [CheckLoginGuard]
  },
  { path: 'noticias', loadChildren: () => import('./pages/home/noticias/noticias.module').then(m => m.NoticiasModule) },
  { path: 'noticias/:idCategory/:categoryName', loadChildren: () => import('./pages/home/noticias/noticias.module').then(m => m.NoticiasModule) },
  { path: 'tramites', loadChildren: () => import('./pages/home/tramites/tramites.module').then(m => m.TramitesModule) },
  { path: 'tramites/buscar/:id/:depto', loadChildren: () => import('./pages/home/buscar/buscar.module').then(m => m.BuscarModule) },
  { path: 'tramites/detalle/:id', loadChildren: () => import('./pages/home/detalle-tramite/detalle-tramite.module').then(m => m.DetalleTramiteModule) },
  { path: 'tramites/agendar-cita/:id', loadChildren: () => import('./pages/home/citas/citas.module').then(m => m.CitasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
