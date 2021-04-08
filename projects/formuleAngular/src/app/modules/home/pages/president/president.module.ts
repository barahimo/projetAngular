import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PresidentRoutingModule } from './president-routing.module';
import { PresidentComponent } from './president.component';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxPrintModule } from 'ngx-print';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    PresidentComponent,
    IndexComponent,
    CreateComponent,
    GraphsComponent,
    EditComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    PresidentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxPrintModule,
    RxReactiveFormsModule
  ],
  exports: [
  ]
})
export class PresidentModule { }
