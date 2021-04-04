import { Procedure } from '@app/shared/models/procedure.interface'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Procedure[]>{

    return this.http.get<Procedure[]>(`${environment.API_URL}/procedures`)
    .pipe(catchError(this.handlerError));
  }

  getById(procedureId: number): Observable<Procedure>{

    return this.http.get<Procedure>(`${environment.API_URL}/procedures/${procedureId}`)
    .pipe(catchError(this.handlerError));
  }
  
  getByDepto(deptoId: number): Observable<Procedure[]> {

    return this.http.get<Procedure[]>(`${environment.API_URL}/procedures/depto/${deptoId}`)
    .pipe(catchError(this.handlerError));
  }
  
  getProcedureWithlimit(limit: number): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${environment.API_URL}/procedures/limit/${limit}`)
    .pipe(catchError(this.handlerError));
  }

  new(procedure: any): Observable<Object>{

    console.log(procedure);

    return this.http.post(`${environment.API_URL}/procedures`, procedure, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }
  
  update(procedureId: number, procedure: any): Observable<Object>{
    
    return this.http.patch(`${environment.API_URL}/procedures/${procedureId}`, procedure, { responseType: 'text' })
    .pipe(catchError(this.handlerError))
  }
  
  delete(procedureId: number): Observable<{}>{
    
    return this.http.delete<Procedure>(`${environment.API_URL}/procedures/${procedureId}`)
    .pipe(catchError(this.handlerError))
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
