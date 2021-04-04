import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseFormCategory } from '@app/shared/utils/base-form-category';
import { CategoriesService } from '../../services/categories.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

  actionTODO = Action.NEW;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public categoryForm: BaseFormCategory,
  public categorySvc: CategoriesService,
  private _snackBar: MatSnackBar,
  public dialogRef: MatDialogRef<CategoryModalComponent>
  ) { }

  ngOnInit(): void {

    if(this.data?.category.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      this.data.title = `Editar Categoria "${this.data?.category?.name}"`;
      this.pathFormData();
    }else{
      this.categoryForm.baseForm.reset();
    }
  }

  onSave(): void{

    const formValue = this.categoryForm.baseForm.value;

    if(this.actionTODO == Action.NEW){
      this.categorySvc.new(formValue).subscribe( (res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Departamento agregado correctamente', 'Aceptar', { duration: 2000});
      });
    }else{
      const categoryId = this.data?.category?.id;
      this.categorySvc.update(categoryId, formValue).subscribe( (res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Departamento agregado correctamente', 'Aceptar', { duration: 2000});
      })
    }
  }

  checkField(field: string): any {

    return this.categoryForm.isValidField(field);

  }

  private pathFormData(): void{
    this.categoryForm.baseForm.patchValue({
      name: this.data?.category?.name,
      description: this.data?.category?.description,
    });
  }

}
