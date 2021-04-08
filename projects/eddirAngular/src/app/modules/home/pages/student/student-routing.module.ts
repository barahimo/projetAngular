import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';
import { StudentComponent } from './student.component';


const routes: Routes = [
  {
    path: 'students',
    component: StudentComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'show/:id',
        component: ShowComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
