import { Roles } from '@app/shared/models/user.interface';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<any>(null);

  constructor(private http:HttpClient, private router: Router) { 
    this.checkToken();
  }

  get user$(): Observable<UserResponse>{

    return this.user.asObservable();
    
  }

  get userValue(): UserResponse{

    return this.user.getValue();
  }

  login(authData:User):Observable<any>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((user:UserResponse)=>{
        
        this.saveLocalStorage(user); 
        this.user.next(user);
        return user;
      }),
      catchError ((err)=>this.handlerError(err))
    );
  }

  logout():void{
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['']); 
  }


  private checkToken():void{
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user){
      
      const isExpired = helper.isTokenExpired(user.token);

      if(isExpired){
        
        this.logout();

      }else{

        this.user.next(user);

      }
    }
    
  }

  private saveLocalStorage(user: UserResponse):void{
    //localStorage.setItem('token', token);

    const { message, ... rest } = user;
    localStorage.setItem("user", JSON.stringify(rest));
    console.log(user);
  }

 
  private handlerError(err:any):Observable<never> {

    let errorMessage = "And error ocurred retrienving data";

    if(err){

      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
