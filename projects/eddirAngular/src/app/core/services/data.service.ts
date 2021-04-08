import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { AppError } from './../commont/app-error';
import { BadInput } from './../commont/bad-input';
import { NotFoundError } from './../commont/not-found-error';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  public url = 'http://localhost:8000';
  //public url = 'https://eddir.barahimo.com';

  private api = this.url + '/api/' + this.urlService;

  constructor(@Inject(String) private urlService: string, private http: HttpClient) { }

  private handleError(error: Response) {
    if (error.status === 404)
      return throwError(new BadInput);
    if (error.status === 404)
      return throwError(new NotFoundError);
    return throwError(new AppError);
  }

  handleErro(error) {
    return throwError(error.message || "Server Error")
  }

  //Method Get Data 
  /* getAll(limit?: number) {
    return this.http.get(this.api + '/' + limit)
      .pipe(catchError(this.handleError));
  } */
  getAll() {
    return this.http.get(this.api)
      .pipe(catchError(this.handleError));
  }

  getSearch($search) {
    return this.http.get(this.api + "?search=" + $search)
      .pipe(catchError(this.handleError));
  }

  //Method Get One element
  getOne(slug: string) {
    return this.http.get(this.api + '/' + slug)
      .pipe(catchError(this.handleError));
  }

  //Method Add Data 
  create(ressource): Observable<any> {
    return this.http.post<any>(this.api, ressource)
      //.map(response => response.json())
      .pipe(catchError(this.handleError));
  }

  createPresident(ressource): Observable<any> {
    return this.http.post<any>("http://localhost:8000/api/createPresidents", ressource)
      //.map(response => response.json())
      .pipe(catchError(this.handleError));
  }
  getPersident() {
    return this.http.get("http://localhost:8000/api/presidents")
      .pipe(catchError(this.handleError));
  }

  //Method Add Data 
  createFile(ressource): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.api, ressource, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  //Method Update Data 
  update(ressource) {
    return this.http.put(this.api + "/" + ressource.id, ressource);
  }

  //Method Update Data 
  updateFile(id, ressource) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(this.api + "/" + id + "?_method=PUT", ressource, { headers: headers });
  }

  //Method Delete Data 
  delete(ressource): Observable<any> {
    return this.http.delete<any>(this.api + "/" + ressource.id)
      .pipe(catchError(this.handleError));
  }
  /* getFileJSON() {
    //this.http.get("http://localhost:4200/assets/test.json").subscribe(data => console.log(data));
    this.http.get("http://localhost:3000/presidents ").subscribe((data: any) => {
      console.log(data);
    });
  } */
  getFileJSON(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/presidents ")
      .pipe(catchError(this.handleError));
  }
  /* showFileJSON(obj) {
    this.http.get("http://localhost:3000/presidents/" + obj.id).subscribe(data => console.log(data));
  } */
  showFileJSON(obj): Observable<any> {
    return this.http.get("http://localhost:3000/presidents/" + obj)
      .pipe(catchError(this.handleError));
  }
  createFileJSON(obj) {
    this.http.post("http://localhost:3000/presidents", obj).subscribe(data => console.warn(data));
  }
  updateFileJSON(id, obj) {
    this.http.put("http://localhost:3000/presidents/" + id, obj).subscribe(data => console.warn(data));
  }
  deleteFileJSON(obj) {
    this.http.delete("http://localhost:3000/presidents/" + obj.id).subscribe(() => this.getFileJSON());
  }
}
