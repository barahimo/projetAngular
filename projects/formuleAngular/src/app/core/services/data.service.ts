import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { AppError } from './../commont/app-error';
import { BadInput } from './../commont/bad-input';
import { NotFoundError } from './../commont/not-found-error';
import { President } from '../../shared/models/president';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  // public url = 'http://localhost:8000';
  public url = 'https://eddir.barahimo.com';
  public api = this.url + '/api/' + this.urlService;

  constructor(@Inject(String) private urlService: string, private http: HttpClient) { }
  private handleError(error: Response) {
    if (error.status === 500)
      return throwError(new BadInput);
    if (error.status === 404)
      return throwError(new NotFoundError);
    return throwError(new AppError);
  }
  getFileJSON(): Observable<any> {
    return this.http.get<any>(this.api)
      .pipe(catchError(this.handleError));
  }
  showFileJSON(obj): Observable<President> {
    return this.http.get<President>(`${this.api}/${obj}`)
      .pipe(catchError(this.handleError));
  }
  createFileJSON(obj) {
    this.http.post(this.api, obj).subscribe(data => console.warn(data));
  }
  createFileJSON2(ressource): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.api, ressource, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  updateFileJSON(id, obj): Observable<President> {
    return this.http.put<President>(`${this.api}/${id}`, obj)
      .pipe(catchError(this.handleError));
  }
  updateFileJSON2(id, obj): Observable<President> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<President>(`${this.api}/${id}?_method=PUT`, obj, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  deleteFileJSON(obj): Observable<President> {
    return this.http.delete<President>(`${this.api}/${obj.id}`)
      .pipe(catchError(this.handleError));
  }
}
