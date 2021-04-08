import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  persist(data) {
    return this.http.post('http://localhost:4000/posts', data)
  }

  getAll() {
    return this.http.get('http://localhost:4000/posts')
  }

  getOne(id) {
    return this.http.get(`http://localhost:4000/posts/${id}`)
  }


}
