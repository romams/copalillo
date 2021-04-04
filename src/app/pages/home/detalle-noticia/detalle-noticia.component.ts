import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CategoriesService } from '@app/pages/admin/services/categories.service';
import { NewsService } from '@app/pages/admin/services/news.service';
import { Category } from '@app/shared/models/category.interface';
import { New } from '@app/shared/models/new.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.css']
})
export class DetalleNoticiaComponent implements OnInit {

  noticias: New[] = [];
  categorias: Category[] = [];
  title: string = '';
  content: string = '';
  image: string = '';
  categoria: any;

  constructor(
    private route: ActivatedRoute, 
    private newsSvc: NewsService, 
    private categoriesSvc: CategoriesService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => {

      this.newsSvc.getById(params['id']).subscribe((res) => {
        
        this.title = res.title;
        this.content = res.content;
        this.image = res.image;
        this.categoria = res.category.name!;
      })

      this.spinner.hide();
    })

    this.newsSvc.getNewsWithLimit(3).subscribe((res) => {
      this.noticias = res;
    })

    this.categoriesSvc.getAll().subscribe((res) => {
      this.categorias = res;
    })
  }

 

}
