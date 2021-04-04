import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormUser } from './base-form-user';

@Injectable({ providedIn: 'root' })

export class BaseFormProcedure extends BaseFormUser{

    constructor(public fb: FormBuilder){
        super(fb);
    }

    baseForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        content: ['', [Validators.required]],
        price: ['', [Validators.required]],
        delay: ['', [Validators.required]],
        horary: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        deptoId: [''],
        userId: ['', [Validators.required]]
    });

    isValidField(field: string): any{
        super.isValidField(field);
    }

    getErrorMessage(field: string): any {
        super.getErrorMessage(field);
    }
}