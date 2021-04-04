import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormUser } from './base-form-user';


@Injectable({ providedIn: 'root' })

export class BaseFormCita extends BaseFormUser{
    constructor(public fb: FormBuilder){
        super(fb);
    }

    baseForm = this.fb.group({
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        date: ['', [Validators.required]],
        hour: ['', [Validators.required]],
        depto:['', [Validators.required]],
        procedureName: ['', [Validators.required]],
        price: ['', [Validators.required]]
    });

    isValidField(field: string): any {
        super.isValidField(field);
    }

    getErrorMessage(field: string): any{
       super.getErrorMessage(field)
    }
}