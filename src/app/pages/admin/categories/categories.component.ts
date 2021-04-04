import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CategoryModalComponent } from './../components/category-modal/category-modal.component';
import { CategoriesService } from '../services/categories.service';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['Id','Name', 'Description', 'Actions'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private categorySvc: CategoriesService, 
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.categorySvc.getAll().subscribe((categories) => {
      
      this.dataSource.data = categories;

      this.dataSource.paginator = this.paginator;

      this.spinner.hide();
    });
  }

  onDelete(categoryId: number): void {


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
        
        this.categorySvc.delete(categoryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'La categoria ha sido eliminado correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })
  }

  onOpenModal(category={}): void{
    this.dialog.open(CategoryModalComponent, {
      height:'300px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Nueva Categoria', category},
    }).afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
