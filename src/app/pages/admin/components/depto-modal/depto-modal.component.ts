import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseFormCategory } from '@app/shared/utils/base-form-category';
import { BaseFormDepto } from '@app/shared/utils/base-form-depto';
import { DeptoService } from '../../services/depto.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-depto-modal',
  templateUrl: './depto-modal.component.html',
  styleUrls: ['./depto-modal.component.css']
})
export class DeptoModalComponent implements OnInit {

  actionTODO = Action.NEW;
  file:any;
  image: any;
  imgName: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public categoryForm: BaseFormCategory,
    public deptoForm : BaseFormDepto,
    public deptoSvc: DeptoService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeptoModalComponent>
  ) { }

  ngOnInit(): void {

    if(this.data?.depto.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      this.data.title = `Editar Departamento "${this.data?.depto?.name}"`;
      this.image = this.data?.depto?.image
      this.pathFormData();
    }else{
      this.deptoForm.baseForm.reset();
    }
    
  }

  onFileChange(event:any){

    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];

      if(file.type.includes("image")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.file = file;
        reader.onload = e => this.image = reader.result;

        this.imgName = file.name
      }
    }
  }

  onSave(): void{

    const formValue = this.deptoForm.baseForm.value;

    if(this.actionTODO == Action.NEW){
      this.deptoSvc.new(formValue, this.file).subscribe( (res) => {

        this.dialogRef.close(res);
        this._snackBar.open('Departamento agregado correctamente', 'Aceptar', { duration: 2000});
        
      });

    }else{

      const deptoId = this.data?.depto?.id;
      this.deptoSvc.update(deptoId, formValue, this.file).subscribe( (res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Departamento actualizado correctamente', 'Aceptar', { duration: 2000});
      })

    }
  }

  checkField(field: string): any {

    return this.deptoForm.isValidField(field);

  }

  private pathFormData(): void{
    this.deptoForm.baseForm.patchValue({
      name: this.data?.depto?.name,
      description: this.data?.depto?.description
    });
  }

}
