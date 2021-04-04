import { Component, OnInit } from '@angular/core';
import { Depto } from '@app/shared/models/depto.interface';
import { New } from '@app/shared/models/new.interface';
import { DeptoService } from '../admin/services/depto.service';
import { NewsService } from '../admin/services/news.service';
import { BaseFormContact } from '@app/shared/utils/base.form-contact'
import { ContactsService } from '../admin/services/contacts.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: New[] = [];
  deptos: Depto[] = [];

  first:string ='';
  constructor(
    private newsSvc: NewsService, 
    private deptoSvc: DeptoService,
    public contactForm: BaseFormContact,
    private contactSvc: ContactsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.newsSvc.getNewsWithLimit(4).subscribe((res) => {
      
      this.noticias = res;
    })
    
    this.deptoSvc.getDeptoWithLimit(4).subscribe((res) => {
      
      this.deptos = res;
      this.spinner.hide();

    })

  }

  onSave(){
    const formValue = this.contactForm.baseForm.value;

    this.contactSvc.newCita(formValue).subscribe((res) => {
      
      Swal.fire(
        'Mensaje enviado',
        '¡Gracias por ponerte en contacto con nosotros!',
        'success'
      )

    })
  }

  coronaUrl(){
    window.open("http://salud.guerrero.gob.mx/salud-coronavirus/");
  }
}
