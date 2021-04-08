import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { StudentRoutingModule } from './student-routing.module';

import { StudentComponent } from './student.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';
import { CreateComponent } from './components/create/create.component';



@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    CreateComponent,
    StudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class StudentModule { }
