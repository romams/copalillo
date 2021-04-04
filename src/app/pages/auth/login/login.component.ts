import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  hide = true;
  private suscripcion: Subscription = new Subscription;     

  loginForm = this.fb.group({
    username:['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(5)]]

  });

  constructor(
    private authSvc: AuthService, 
    private fb:FormBuilder, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy():void{

    this.suscripcion.unsubscribe();
  }

  onLogin():void{ 

    if(this.loginForm.invalid){
      return;
    }

    const formValue = this.loginForm.value;

    this.suscripcion.add(
      this.authSvc.login(formValue).subscribe( res => {
        if(res){
          console.log(res)
          this.router.navigate(['admin']);
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal. Verifique que sus datos sean correctos.'
          })
        }
      })
    );  
  }
  
  getErrorMessage(field:string){
    let message;
    
    if(this.loginForm.get(field)?.errors?.required){
    
      message = 'you must enter a value';
    
    }else if(this.loginForm.get(field)?.hasError('minlength')){

      const minLength = this.loginForm.get(field)?.errors?.minlength
      .requiredLength;
    
      message = `This field must be longer than ${minLength} characters`;
    }

    return message;

  }

  isValidFiel(field:string){

    return (
      
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && 
      
      !this.loginForm.get(field)?.valid
    );
  }
}
