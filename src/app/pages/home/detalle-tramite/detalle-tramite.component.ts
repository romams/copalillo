import { Component, OnInit } from '@angular/core';
import { ProceduresService } from '@app/pages/admin/services/procedures.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-detalle-tramite',
  templateUrl: './detalle-tramite.component.html',
  styleUrls: ['./detalle-tramite.component.css']
})
export class DetalleTramiteComponent implements OnInit {

  id: number = 0;
  titulo: string = '';
  description: string = '';
  content: string = '';
  price: number = 0;
  delay: string = '';
  horary: string = '';
  telephone: string = '';
  depto: any;

  constructor(
    private tramitesSvc: ProceduresService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => {

      this.tramitesSvc.getById(params['id']).subscribe((res) => {

      this.id = res.id;
      this.titulo = res.title;
      this.description = res.description;
      this.content = res.content;
      this.price = res.price;
      this.horary = res.horary;
      this.delay = res.delay;
      this.telephone = res.telephone;
      this.depto = res.depto.name!;      
        
      })
      this.spinner.hide();
    })
  }

}
