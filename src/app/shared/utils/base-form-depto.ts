import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormUser } from './base-form-user';

@Injectable( {providedIn: 'root'})

export class BaseFormDepto extends BaseFormUser{

    constructor(public fb: FormBuilder){
        super(fb);
    }

    baseForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        image: ['', [Validators.required]],
    });

    isValidField(field: string): any {
        super.isValidField(field);
    }

    getErrorMessage(field: string): any{
       super.getErrorMessage(field)
    }

}