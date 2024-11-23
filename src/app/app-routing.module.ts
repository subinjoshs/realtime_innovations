import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', loadComponent: () => import('./pages/emp-list/emp-list.component').then(m => m.EmpListComponent)
  },
  {
    path: 'emp-details', pathMatch: 'full', loadComponent: () => import('./pages/emp-form/emp-form.component').then(m => m.EmpFormComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
