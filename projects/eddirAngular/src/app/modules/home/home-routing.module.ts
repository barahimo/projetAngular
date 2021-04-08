import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent as Teacher } from './pages/teacher/components/index/index.component';
import { IndexComponent as Student } from './pages/student/components/index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/teachers',
    pathMatch: 'full'
  },
  { path: 'teachers', component: Teacher },
  { path: 'students', component: Student },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
