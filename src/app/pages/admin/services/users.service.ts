import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<User[]>{

  return this.http.get<User[]>(`${environment.API_URL}/users`)

  .pipe(catchError(this.handlerError));

  }
  
  getById(userId: number):Observable<User>{

    return this.http.get<any>(`${environment.API_URL}/users/${userId}`)
    .pipe(catchError(this.handlerError));
  }
  
  new(user: any): Observable<Object>{
    return this.http.post(`${environment.API_URL}/users`, user, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  } 
  
  update(userId: number, user:any):Observable<Object>{

    return this.http.patch(`${environment.API_URL}/users/${userId}`, user, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }
  
  delete(userId:number):Observable<{}>{
    return this.http.delete(`${environment.API_URL}/users/${userId}`, { responseType: 'text' })
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
