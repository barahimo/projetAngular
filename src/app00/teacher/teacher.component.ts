import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  teachers = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.get("http://localhost:3000/teachers").subscribe((data: any) => this.teachers = data);
  }

}
