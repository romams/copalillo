import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProcedureModalComponent } from '../components/procedure-modal/procedure-modal.component';
import { ProceduresService } from '../services/procedures.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit, OnDestroy{


  displayedColumns: string[] = ['Id', 'Nombre', 'Precio', 'Departamento', 'Acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private destroy$ = new Subject<any>();
  
  constructor(private procedureSvc: ProceduresService, 
    private dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.procedureSvc.getAll().subscribe((procedures) => {

      this.dataSource.data = procedures;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    })
  }

  onDelete(userId: number): void {

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
        
        this.procedureSvc.delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'El trámite ha sido eliminado correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })
  }


  onOpenModal(procedure={}): void{
    this.dialog.open(ProcedureModalComponent, {
      height:'550px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Nuevo Trámite', procedure},
    }).afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void{

    this.destroy$.next({});
    this.destroy$.complete();
  }
}
