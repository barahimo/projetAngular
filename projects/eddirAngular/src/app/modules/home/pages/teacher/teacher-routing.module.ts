import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
  {
    path: 'teachers',
    component: TeacherComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'show/:id',
        component: ShowComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
