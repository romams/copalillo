import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Depto } from '@app/shared/models/depto.interface';
import { New } from '@app/shared/models/new.interface';
import { Procedure } from '@app/shared/models/procedure.interface';
import { AuthService } from '../auth/auth.service';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { NewModalComponent } from './components/new-modal/new-modal.component';
import { ProcedureModalComponent } from './components/procedure-modal/procedure-modal.component';
import { CitasService } from './services/citas.service';
import { NewsService } from './services/news.service';
import { ProceduresService } from './services/procedures.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  
  noticias: New[] = [];
  tramites: Procedure[] = [];
  deptos: Depto[] = [];

  citasdisplayedColumns: string[] = ['#', 'Nombre', 'Tramite', 'Departamento' , 'Fecha', 'Hora', 'Acciones'];
  citadataSource = new MatTableDataSource();

  proceduresdisplayedColumns: string[] = ['Id', 'Nombre', 'Precio', 'Departamento', 'Acciones'];
  procedureDataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();
  
  constructor(
    public authSvc: AuthService, 
    public newsSvc: NewsService,
    public procedureSvc: ProceduresService, 
    public citasSvc: CitasService, 
    private citasDialog: MatDialog,
    private noticiaDialog: MatDialog,
    private procedureDialog: MatDialog,
    private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.newsSvc.getNewsWithLimit(4).subscribe((res) => {
      this.noticias = res;
    })

    this.citasSvc.getCitaWithLimit(5).subscribe((citas) => {
      this.citadataSource.data = citas;
    })

    this.procedureSvc.getProcedureWithlimit(5).subscribe((procedures) => {
      this.procedureDataSource.data = procedures;
      this.spinner.hide()
    })
  }

  viewDetails(element: Element):void {

    this.citasDialog.open(CitaDetailComponent, {
      height:'550px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Detalle cita', element},
    })
  }

  onOpenModal(noticia={}): void{
    
      this.noticiaDialog.open(NewModalComponent, {
      height:'580px',
      width: '60%',
      hasBackdrop: false,
      data: { title: 'Nueva Noticia', noticia },
    }).afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  onDetailProcedure(procedure={}): void{
    this.procedureDialog.open(ProcedureModalComponent, {
      height:'550px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Nuevo Trámite', procedure},
    }).afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  onDeleteProcedure(procedureId: number){

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
        
        this.procedureSvc.delete(procedureId)
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

  onDeleteNews(newsId: number){

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


  onDeleteCita(citaId: number){

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
        
        this.citasSvc.delete(citaId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'La cita ha sido eliminada correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })

  }

  ngOnDestroy(): void{

    this.destroy$.next({});
    this.destroy$.complete();
  }
  
}
