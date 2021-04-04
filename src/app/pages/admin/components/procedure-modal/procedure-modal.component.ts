import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/pages/auth/auth.service';
import { Depto } from '@app/shared/models/depto.interface';
import { BaseFormProcedure } from '@app/shared/utils/base-form-procedure';
import { DeptoService } from '../../services/depto.service';
import { ProceduresService } from '../../services/procedures.service';

enum Action{
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-procedure-modal',
  templateUrl: './procedure-modal.component.html',
  styleUrls: ['./procedure-modal.component.css']
})
export class ProcedureModalComponent implements OnInit {

  actionTODO = Action.NEW;
  departamentos: Depto[] = [];
  userId: number = this.getUserId();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private procedureSvc: ProceduresService,
    private deptoSvc: DeptoService,
    public procedureForm: BaseFormProcedure,
    private authSvc: AuthService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProcedureModalComponent>) { }

  ngOnInit(): void {

    if (this.data?.procedure?.hasOwnProperty('id')) {
      
      this.actionTODO = Action.EDIT;

      this.data.title = "Editar Trámite";
      this.pathFormData();
    } else {
      this.procedureForm.baseForm.reset();
    }
    
    this.deptoSvc.getAll().subscribe((depto) => {

      this.departamentos = depto;
    })
  }

  onSave(): void {

    const formValue = this.procedureForm.baseForm.value;

    if(this.actionTODO == Action.NEW){
      this.procedureSvc.new(formValue).subscribe((res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Trámite agregado correctamente', 'Aceptar', { duration: 2000});
      });
    }else{
      const procedureId = this.data.procedure.id;
      this.procedureSvc.update(procedureId, formValue).subscribe((res)=> {
        this.dialogRef.close(res);
        this._snackBar.open('Trámite editado correctamente', 'Aceptar', { duration: 2000});
      });
    }
  }

  checkField(field: string): any {

    return this.procedureForm.isValidField(field);

  }

  private pathFormData(): void{

    this.procedureForm.baseForm.patchValue({
      title: this.data?.procedure?.title,
      description: this.data?.procedure?.description,
      content: this.data?.procedure?.content,
      price: this.data?.procedure?.price,
      delay: this.data?.procedure?.delay,
      horary: this.data?.procedure?.horary,
      phone: this.data?.procedure?.telephone,
      deptoId: this.data?.procedure?.depto?.id
    })

  }

  getUserId():number{
    this.authSvc.user$.subscribe((data) => {
      this.userId = data.userId
    })

    return this.userId;
  }
}
