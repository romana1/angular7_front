import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './contact-list/table.component';
import { CreateForm } from './contact-list/create-form/create-form.component';

const routes: Routes = [
        {path: '', pathMatch: 'full', redirectTo: 'contacts'},
  {
    path: 'contacts' , 
    component: TableComponent,
    children: [
      { 
        path: '', 
        component: CreateForm 
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
