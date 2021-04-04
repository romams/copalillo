import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '@app/shared/models/contact.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    
    return this.http.get<Contact[]>(`${environment.API_URL}/contact`)
    .pipe(catchError(this.handlerError))
  }
  
  newCita(message: any): Observable<Object>{
    console.log(message);
    return this.http.post(`${environment.API_URL}/contact`, message, { responseType: 'text' })
    .pipe(catchError(this.handlerError))
  }

  delete(messageId: number): Observable<{}>{

    return this.http.delete<Contact>(`${environment.API_URL}/contact/${messageId}`)
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
