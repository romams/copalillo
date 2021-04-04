import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/pages/auth/auth.service';
import { Category } from '@app/shared/models/category.interface';
import { New } from '@app/shared/models/new.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';
import { NewsService } from '../services/news.service';
import {NewModalComponent } from './../components/new-modal/new-modal.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  
  p: number = 1;
  private destroy$ = new Subject<any>();

  constructor(
    private newsSvc: NewsService, 
    private dialog: MatDialog, 
    private authSvc: AuthService,
    private spinner: NgxSpinnerService) { }
  

  news: New[] = [];
  userId: number = this.getUserId();

  ngOnInit(): void {
    this.spinner.show();
    this.newsSvc.getAll(this.userId).subscribe((res)  => {
      this.news = res;
      this.spinner.hide();
    })
  }

  getUserId():number{
    this.authSvc.user$.subscribe((data) => {
      this.userId = data.userId
    })

    return this.userId;
  }


  onDelete(newsId: number): void {

    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir la accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"Cancelar",
      confirmButtonText: 'Sí, borrar.',
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.newsSvc.delete(newsId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'La noticia ha sido eliminado correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })
  }

  onOpenModal(noticia={}): void{
      console.log(noticia);
      this.dialog.open(NewModalComponent, {
      height:'580px',
      width: '900px',
      hasBackdrop: false,
      data: { title: 'Nueva Noticia', noticia },
    }).afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void{

    this.destroy$.next({});
    this.destroy$.complete();
  }

}
