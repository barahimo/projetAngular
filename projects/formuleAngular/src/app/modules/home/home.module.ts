import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { PresidentModule } from './pages/president/president.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HomeComponent } from './home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule.forRoot(),
    PresidentModule
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
