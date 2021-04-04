import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  charge( tokenId: any, cantidad: any, description: any){

    return this.http.post<Object>(`${environment.API_URL}/stripe/stripe-checkout`, {
      stripeToken: tokenId,
      cantidad: cantidad,
      description: description
    })
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
