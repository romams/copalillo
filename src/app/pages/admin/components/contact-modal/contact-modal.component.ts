import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeptoModalComponent } from '../depto-modal/depto-modal.component';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  nombre: string = '';
  razon: string = '';
  correo: string = '';
  telefono: string = '';
  contenido: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeptoModalComponent>
  ) {
    this.nombre = this.data?.contact?.name;
    this.razon = this.data?.contact.reason;
    this.correo = this.data?.contact.email;
    this.telefono = this.data?.contact.telephone;
    this.contenido = this.data?.contact.content;
   }

  ngOnInit(): void {
    
  }

}
