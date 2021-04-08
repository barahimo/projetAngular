import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends DataService {

  constructor(http: HttpClient) {
    super('students', http);
  }
}
