import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { CreateComponent } from './pages/president/components/create/create.component';
import { IndexComponent } from './pages/president/components/index/index.component';
import { PresidentComponent } from './pages/president/president.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/presidents',
    pathMatch: 'full'
  },
  { path: 'presidents', component: IndexComponent },
  { path: '404', component: NotfoundComponent },
  //{ path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
