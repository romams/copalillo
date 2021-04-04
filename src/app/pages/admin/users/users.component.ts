import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  
  
  displayedColumns: string[] = ['Id', 'Role', 'Username', 'Actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  private destroy$ = new Subject<any>();
  
  constructor(
    private userSvc: UsersService, private dialog: MatDialog,
    private spinner: NgxSpinnerService) {}
  
  ngOnInit(): void{
    
    this.getData();
  }

  getData():void {
    this.spinner.show();

    this.userSvc.getAll().subscribe((users)=> {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    });
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
          
          this.userSvc.delete(userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => {
          this.ngOnInit();
        });
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado correctamente.',
            'success'
            )
          this.ngOnInit();
        }
      })
    }

    onOpenModal(user={}): void{
      this.dialog.open(ModalComponent, {
        height:'300px',
        width: '600px',
        hasBackdrop: false,
        data: { title: 'Nuevo usuario', user },
      }).afterClosed().subscribe(()=>{
        this.getData();
      })
    }

    ngOnDestroy(): void{

      this.destroy$.next({});
      this.destroy$.complete();
    }
}