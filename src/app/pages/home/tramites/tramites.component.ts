import { Component, OnInit } from '@angular/core';
import { DeptoService } from '@app/pages/admin/services/depto.service';
import { Depto } from '@app/shared/models/depto.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

  constructor(private deptoSvc: DeptoService, 
    private spinner: NgxSpinnerService) { }

  departamentos: Depto[] = [];

  ngOnInit(): void {
    this.spinner.show()
    this.deptoSvc.getAll().subscribe((res) => {
      
      this.departamentos = res;

      this.spinner.hide()
    })
  }

}
