import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { New } from '@app/shared/models/new.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<New[]>{

    return this.http.get<New[]>(`${environment.API_URL}/posts`)
    .pipe(catchError(this.handlerError));
  }

  getAll(userId: number): Observable<New[]>{
    return this.http.get<New[]>(`${environment.API_URL}/posts/${userId}/post`)

    .pipe(catchError(this.handlerError));
  }

  getNewsWithLimit(limit: number): Observable<New[]>{

    return this.http.get<New[]>(`${environment.API_URL}/posts/limit/${limit}`)
    .pipe(catchError(this.handlerError));
  }

  getById(newsId: number): Observable<New>{
    return this.http.get<New>(`${environment.API_URL}/posts/${newsId}`)
    .pipe(catchError(this.handlerError));
  }

  getByCategory(categoryId: number): Observable<New[]>{
    return this.http.get<New[]>(`${environment.API_URL}/posts/category/${categoryId}`)
    .pipe(catchError(this.handlerError));
  }

  newPost(newPost: any, file: File): Observable<Object>{
    
    const form = new FormData();

    form.append('title', newPost.title);
    form.append('content', newPost.content);
    form.append('image', file);
    form.append('userId', newPost.userId);
    form.append('categoryId', newPost.categoryId);

    return this.http.post(`${environment.API_URL}/posts`, form, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  update(newsId: number, news:any, file: File):Observable<Object>{
    const form = new FormData();

    form.append('title', news.title);
    form.append('content', news.content);
    form.append('image', file);
    form.append('categoryId', news.categoryId);


    return this.http.patch(`${environment.API_URL}/posts/${newsId}`, form, { responseType: 'text' })
    .pipe(catchError(this.handlerError));
  }

  delete(newsId:number):Observable<{}>{
    return this.http.delete<New>(`${environment.API_URL}/posts/${newsId}`)
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
