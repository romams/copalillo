import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas  from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CitasService } from '@app/pages/admin/services/citas.service';
import { Cita } from '@app/shared/models/cita.interface';
import { StripeService } from '@app/stripe.service';

declare var paypal: any;
@Component({
  selector: 'app-citas-modal',
  templateUrl: './citas-modal.component.html',
  styleUrls: ['./citas-modal.component.css']
})
export class CitasModalComponent implements OnInit, AfterViewInit {

  @ViewChild('paypal', {static: true}) paypalElement: any;
  @ViewChild('cardInfo', {static: true}) cardInfo: any;
  cardError: string = '';
  card: any;

  message: string = '';

  id: number = this.data?.formValue?.id;
  nombre: string =  this.data?.formValue?.name;
  fecha: any = this.data?.formValue?.date;
  hora: any = this.data?.formValue?.hour;
  depto: any = this.data?.formValue?.depto;
  procedureName: string = this.data?.formValue.procedureName;
  price = this.data?.formValue?.price;

  cita: Cita = {
    'name': this.nombre,
    'address': this.data?.formValue?.address,
    'telephone': this.data?.formValue?.telephone,
    'hour': this.hora,
    'date': this.fecha,
    'procedure': {
      'id': this.id
    }
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private citasSvc: CitasService,
    private ngzone: NgZone,
    private stripeService: StripeService
    ) { }
    
    
    ngOnInit(): void {
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.nombre,
              amount: {
                currency_code: 'MXN',
                value: this.price
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: any ) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: function (err: any) {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement)
  }

  public onClickTesoreria(){
    
    const m: string = "Pendiente a pagar en tesoreria"
    this.citasSvc.newCita(this.cita).subscribe( (res) => {
      
      Swal.fire(
        '¡Cita agregada!',
        'Asegurate de asistir puntualmente a tu cita',
        'success'
      )
      
    });
    

    this.downloadPDF(m);
  }

  public downloadPDF(mensaje: string){

    const data = document.getElementById('datacontent')!
    var divMessage = document.createElement("h4");

    var messageContent = document.createTextNode(mensaje);
    divMessage.appendChild(messageContent);

    var currentDiv = document.getElementById("div1")!;
    divMessage.className += "card-subtitle mb-2 badge badge-danger";
    currentDiv.parentNode?.insertBefore(divMessage, currentDiv.nextSibling);

    let imgName = `comprobante-${this.data?.formValue?.name}`;
    
    html2canvas(data).then(canvas => {
      let enlace = document.createElement('a');
      enlace.download = imgName;
      
      enlace.href = canvas.toDataURL();
      enlace.click();
    })

  }
  
  ngAfterViewInit(){
    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }
  
  onChange({error}: {error: any}){
    if(error){
      this.ngzone.run(() => this.cardError = error.message);
    }else{
      this.ngzone.run(() => this.cardError = null as any);
    }
  }

  async onPay(){

    const { token, error } = await stripe.createToken(this.card);

    if(token) {
      await this.stripeService.charge(token.id, this.price, this.procedureName).subscribe( (res) => {
        console.log("Pago hecho!")
        
      });
    }else{
      this.ngzone.run(() => this.cardError = error.message);
    }
  }

}
