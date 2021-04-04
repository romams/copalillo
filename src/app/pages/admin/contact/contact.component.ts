import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '@app/shared/models/contact.interface';
import { Subject } from 'rxjs';
import { ContactsService } from '../services/contacts.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';
import Swal from 'sweetalert2'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];

  displayedColumns: string[] = ['#', 'Nombre', 'Razon', 'Correo' , 'Telefono', 'Acciones'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private contactsSvc: ContactsService, 
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.spinner.show();
    this.contactsSvc.getAll().subscribe((res) => {
      this.dataSource.data = res;
      
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    })
  }

  onOpenModal(contact={}): void{
    console.log(contact);
    this.dialog.open(ContactModalComponent, {
      height:'500px',
      width: '800px',
      hasBackdrop: false,
      data: { title: 'Detalle', contact},
    })
    .afterClosed().pipe().subscribe(()=>{
      this.ngOnInit()
    })
  }

  onDelete(contactId: number) {
    
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
        
        this.contactsSvc.delete(contactId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
        this.ngOnInit();
      });
        Swal.fire(
          '¡Eliminado!',
          'Mesaje eliminado correctamente.',
          'success'
          )
        this.ngOnInit();
      }
    })
  }

}
