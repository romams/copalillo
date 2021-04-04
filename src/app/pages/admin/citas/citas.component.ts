import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CitasService } from '../services/citas.service';
import { CitaDetailComponent } from '../components/cita-detail/cita-detail.component'
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit{

  displayedColumns: string[] = ['#', 'Nombre', 'Tramite', 'Departamento' , 'Fecha', 'Hora', 'Acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private destroy$ = new Subject<any>();

  constructor(private citasSVc: CitasService, private dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.citasSVc.getAll().subscribe((citas) => {
      this.dataSource.data = citas;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    })
  }

  viewDetails(element: Element):void {

    this.dialog.open(CitaDetailComponent, {
      height:'550px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Detalle cita', element},
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
        
        this.citasSVc.delete(citaId)
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
}
