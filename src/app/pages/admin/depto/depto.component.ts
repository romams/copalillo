import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeptoModalComponent } from '../components/depto-modal/depto-modal.component';
import { DeptoService } from '../services/depto.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-depto',
  templateUrl: './depto.component.html',
  styleUrls: ['./depto.component.css']
})
export class DeptoComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['Id', 'Nombre', 'Descripcion', 'Acciones'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private deptoSvc: DeptoService, 
    private dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.deptoSvc.getAll().subscribe((depto) => {

      this.dataSource.data = depto;
      
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    })
  }
  
  onDelete(deptoId: number) {
    
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
        
        this.deptoSvc.delete(deptoId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'El departamento ha sido eliminado correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })
  }

  onOpenModal(depto={}): void{
    this.dialog.open(DeptoModalComponent, {
      height:'400px',
      width: '800px',
      hasBackdrop: false,
      data: { title: 'Nueva Departamento', depto},
    })
    .afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
