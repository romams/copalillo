import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable( {providedIn: 'root'})
export class BaseFormUser {

    constructor(public fb: FormBuilder){}

    baseForm = this.fb.group({
        username:['', [Validators.required]],
        password:['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required]]    
    });
    
    isValidField(field:string){
        
       return (
          
          (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty) && 
          
          !this.baseForm.get(field)?.valid
        );
    }

    getErrorMessage(field:string){

        let message;
        if(this.baseForm.get(field)?.errors?.required){
        
          message = 'you must enter a value';
        
        }else if(this.baseForm.get(field)?.hasError('minlength')){
    
          const minLength = this.baseForm.get(field)?.errors?.minlength
          .requiredLength;
        
          message = `This field must be longer than ${minLength} characters`;
        }
        
        return message;
    }
}