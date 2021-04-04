import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseFormUser } from '@app/shared/utils/base-form-user';
import { UsersService } from '../../services/users.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, 
    public userForm: BaseFormUser,
    private userSvc: UsersService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    if(this.data?.user.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password')?.setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Editar usuario'
      this.pathFormData();
    }else{
      this.userForm.baseForm.reset();
    }
  }

  onSave(): void{
    
    const formValue = this.userForm.baseForm.value;

    if(this.actionTODO == Action.NEW){
      this.userSvc.new(formValue).subscribe( (res) => {

        this.dialogRef.close(res);
        this._snackBar.open('Usuario agregado correctamente', 'Aceptar', { duration: 2000});
      });

    }else{
      const userId = this.data?.user?.id;
      this.userSvc.update(userId, formValue).subscribe( (res) => {

        this._snackBar.open('Usuario actualizado correctamente', 'Aceptar', { duration: 2000});
        this.dialogRef.close(res);
      })
    }
  }

  checkField(field: string): any {

    return this.userForm.isValidField(field);

  }

  private pathFormData(): void{
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  }
}
