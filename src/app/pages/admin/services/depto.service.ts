import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Depto } from '@shared/models/depto.interface'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};

@Injectable({
  providedIn: 'root'
})
export class DeptoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Depto[]>{

    return this.http.get<Depto[]>(`${environment.API_URL}/depto`)
    .pipe(catchError(this.handlerError));
  }

  getDeptoWithLimit(limit: number): Observable<Depto[]>{
    return this.http.get<Depto[]>(`${environment.API_URL}/depto/limit/${limit}`)
    .pipe(catchError(this.handlerError));
  }
  new(depto: any, file: File): Observable<Object>{

    const form = new FormData();

    form.append('name', depto.name);
    form.append('description', depto.description);
    form.append('image', file);

    return this.http.post(`${environment.API_URL}/depto`, form, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  update (deptoId: number, depto: any, file: File): Observable<Object>{

    const form = new FormData();

    form.append('name', depto.name);
    form.append('description', depto.description);
    form.append('image', file);

    return this.http.patch(`${environment.API_URL}/depto/${deptoId}`, form, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  delete(deptoId: number): Observable<{}>{

    return this.http.delete<Depto>(`${environment.API_URL}/depto/${deptoId}`)
    .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never>{
    let errorMessage = 'Error desconocido'

    if(error){
      errorMessage = `Error ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
