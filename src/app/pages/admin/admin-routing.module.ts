import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent 
  }, 
  { 
    path: 'users', 
    loadChildren: () => 
    import('./users/users.module').then(m => m.UsersModule) 
  },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'procedures', loadChildren: () => import('./procedures/procedures.module').then(m => m.ProceduresModule) },
  { path: 'depto', loadChildren: () => import('./depto/depto.module').then(m => m.DeptoModule) },
  { path: 'citas', loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule) },
  { path: 'contacts', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
