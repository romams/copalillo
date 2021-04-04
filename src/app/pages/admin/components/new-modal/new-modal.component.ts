import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/pages/auth/auth.service';
import { Category } from '@app/shared/models/category.interface';
import { BaseFormNew } from '@app/shared/utils/base-form-new';
import { CategoriesService } from '../../services/categories.service';
import { NewsService } from '../../services/news.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.css']
})
export class NewModalComponent implements OnInit {
  actionTODO = Action.NEW;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private newsSvc: NewsService,
    private categorySvc: CategoriesService,
    public newForm: BaseFormNew,
    private authSvc: AuthService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewModalComponent>) { }
    
  categories: Category[] = [];
  userId: number = this.getUserId();
  file: any;
  image: any = '';
  imgName: any;

  ngOnInit(): void {

    if(this.data?.noticia?.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      
      this.data.title = 'Editar Noticia'
      this.image = this.data?.noticia?.image;
      this.pathFormData();
    }else{
      this.newForm.baseForm.reset();
    }

    this.categorySvc.getAll().subscribe((cat) =>{
      
      this.categories = cat;

    })


  }

  onFileChange(event:any){
    this.imgName = document.getElementById('filename');

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
    
    const formValue = this.newForm.baseForm.value;

    if(this.actionTODO == Action.NEW){
      this.newsSvc.newPost(formValue, this.file).subscribe( (res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Noticia agregada correctamente', 'Aceptar', { duration: 2000});
      });

    }else{
      const newsId = this.data?.noticia?.id;
      this.newsSvc.update(newsId, formValue, this.file).subscribe( (res) => {
        this.dialogRef.close(res);
        this._snackBar.open('Noticia actualizada correctamente', 'Aceptar', { duration: 2000});
      })
    }
  }

  checkField(field: string): any {

    return this.newForm.isValidField(field);

  }

  private pathFormData(): void{
    this.newForm.baseForm.patchValue({
      title: this.data?.noticia?.title,
      content: this.data?.noticia?.content,
      categoryId: this.data?.noticia?.category?.id
    });
  }

  getUserId():number{
    this.authSvc.user$.subscribe((data) => {
      this.userId = data.userId
    })

    return this.userId;
  }
}
