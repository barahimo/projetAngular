import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresidentComponent } from './president.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { GraphsComponent } from './components/graphs/graphs.component';


const routes: Routes = [
  {
    path: 'presidents',
    component: PresidentComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'graphs',
        component: GraphsComponent,
      },
      {
        path: 'show/:id',
        component: ShowComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresidentRoutingModule { }
