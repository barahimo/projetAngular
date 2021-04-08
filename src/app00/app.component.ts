import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  presidents = [];
  constructor(private http: HttpClient) {
    this.get();
  }
  get() {
    this.http.get("http://localhost:3000/presidents").subscribe((data: any) => this.presidents = data);
  }
  title = 'formuleAngular';
}
