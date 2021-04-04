import { Component, OnInit } from '@angular/core';
import { ProceduresService } from '@app/pages/admin/services/procedures.service';
import { ActivatedRoute } from '@angular/router'
import { Procedure } from '@app/shared/models/procedure.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  p: number = 1;
  deptoName: string = '';
  tramitesDepto: Procedure[] = [];

  constructor(
    private tramitesSvc: ProceduresService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();

    if(this.route.params != null){
      
      this.route.params.subscribe((params) => {
  
        this.tramitesSvc.getByDepto(params['id']).subscribe((res) => {
          this.deptoName = params['depto'];
          this.tramitesDepto = res;
          this.spinner.hide();
        })
      })
    }
    
  }

}
