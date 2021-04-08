import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TeacherModule } from './pages/teacher/teacher.module';
import { StudentModule } from './pages/student/student.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NavbarComponent } from 'projects/eddirAngular/src/app/shared/components/navbar/navbar.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule.forRoot(),
    TeacherModule,
    StudentModule,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
