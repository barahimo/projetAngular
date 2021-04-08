import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';


const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "teachers",
  //   pathMatch: "full"
  // },
  { path: 'teachers', component: TeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
