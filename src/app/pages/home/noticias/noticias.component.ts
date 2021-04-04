import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '@app/pages/admin/services/news.service';
import { New } from '@app/shared/models/new.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  p: number = 1;
  noticias: New[] = [];
  categoryN: string = "";
  constructor(
    private newsSvc: NewsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    
    this.route.params.subscribe((params) => {
    
      if(params['idCategory']){
        
        this.newsSvc.getByCategory(params['idCategory']).subscribe((res) => {
          console.log(params['categoryName']);
          this.categoryN = params['categoryName'];
          this.noticias = res;
          this.spinner.hide();
        })

      }else{
        this.newsSvc.getNews().subscribe((res) =>{
        
          this.noticias = res;
          this.spinner.hide()
        })
      }
    })
    
  }

}
