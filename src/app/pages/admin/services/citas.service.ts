import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from '@app/shared/models/cita.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cita[]> {
    
    return this.http.get<Cita[]>(`${environment.API_URL}/citas`)
    .pipe(catchError(this.handlerError))
  }

  getCitaWithLimit(limit: number): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${environment.API_URL}/citas/limit/${limit}`)
    .pipe(catchError(this.handlerError));
  }

  newCita(cita: any): Observable<Object>{

    return this.http.post(`${environment.API_URL}/citas`, cita, { responseType: 'text' })
    .pipe(catchError(this.handlerError))
  }

  delete(citaId: number): Observable<{}>{

    return this.http.delete<Cita>(`${environment.API_URL}/citas/${citaId}`)
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
