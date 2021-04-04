import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProceduresService } from '@app/pages/admin/services/procedures.service';
import { CitasModalComponent } from './../components/citas-modal/citas-modal.component';
import { BaseFormCita } from '@app/shared/utils/base-form-cita';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  id: number = 0;
  titulo: string = '';
  price: number = 0;
  horary: string = '';
  delay: string = '';
  depto: any;
  deptoId: number = 0;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private tramitesSvc: ProceduresService,
    public citaForm: BaseFormCita
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {

      this.tramitesSvc.getById(params['id']).subscribe((res) => {

      this.id = res.id;
      this.titulo = res.title;
      this.price = res.price;
      this.horary = res.horary;
      this.delay = res.delay;
      this.depto = res.depto.name!;
      this.deptoId = res.depto.id;
      })

    })

  }

  onOpenModal(): void{

    const formValue = this.citaForm.baseForm.value;
    this.dialog.open(CitasModalComponent, {
      height:'580px',
      width: '900px',
      data: { title: 'seleccione un método de pago', formValue},
    });

  }

  getFormValue(){

    
  }
}
