import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormUser } from './base-form-user';


@Injectable({ providedIn: 'root' })

export class BaseFormContact extends BaseFormUser{

    constructor(public fb: FormBuilder){
        super(fb);
    }

    baseForm = this.fb.group({
        name: ['', [Validators.required]],
        reason: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        content: ['', [Validators.required]],
    });

    isValidField(field: string): any {
        super.isValidField(field);
    }

    getErrorMessage(field: string): any{
       super.getErrorMessage(field)
    }
}