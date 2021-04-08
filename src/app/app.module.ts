import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundComponent } from './projects/formuleAngular/src/app/modules/home/pages/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPostsComponent,
    AddPostComponent,
    ShowPostComponent,
    MenuComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
