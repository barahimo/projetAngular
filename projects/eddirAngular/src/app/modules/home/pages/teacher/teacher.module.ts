import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';

import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';
import { CreateComponent } from './components/create/create.component';
import { TeacherComponent } from './teacher.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    TeacherComponent,
    IndexComponent,
    ShowComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class TeacherModule { }
