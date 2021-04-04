import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cita-detail',
  templateUrl: './cita-detail.component.html',
  styleUrls: ['./cita-detail.component.css']
})
export class CitaDetailComponent implements OnInit {


  nombre: string = this.data?.element?.name
  fecha: string = this.data?.element?.date
  hora: string = this.data?.element?.hour
  price: string = this.data?.element?.procedure?.price
  depto: string = this.data?.element?.procedure?.depto.name
  procedureName: string = this.data?.element?.procedure?.title

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,) { }

  ngOnInit(): void {
  }

}
