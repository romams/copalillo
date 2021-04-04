import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@app/shared/models/category.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]>{

    return this.http.get<Category[]>(`${environment.API_URL}/categories`)
    
    .pipe(catchError(this.handlerError));

  }

  new(category: Category): Observable<Object>{
    return this.http.post(`${environment.API_URL}/categories`, category, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  update(categoryId: number, category:any): Observable<Object>{
    return this.http.patch(`${environment.API_URL}/categories/${categoryId}`, category, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  delete(categoryId:number):Observable<{}>{
    return this.http.delete<Category>(`${environment.API_URL}/categories/${categoryId}`)
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
