(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{YxBh:function(t,i,c){"use strict";c.r(i),c.d(i,"DetalleNoticiaModule",function(){return p});var n=c("ofXK"),e=c("tyNb"),o=c("fXoL"),a=c("lnlZ"),r=c("5COb"),s=c("JqCM"),l=c("A5z7");function b(t,i){if(1&t&&(o.bc(0,"div",9),o.bc(1,"div",10),o.Wb(2,"img",11),o.bc(3,"div",12),o.bc(4,"a",13),o.bc(5,"h4"),o.Rc(6),o.ac(),o.ac(),o.ac(),o.ac(),o.ac()),2&t){const t=i.$implicit;o.Jb(2),o.vc("src",t.image,o.Ic),o.Jb(2),o.wc("routerLink","/noticias/detalle/",t.id,""),o.Jb(2),o.Tc(" ",t.title," ")}}function m(t,i){if(1&t&&(o.bc(0,"mat-chip",14),o.Rc(1),o.ac()),2&t){const t=i.$implicit;o.xc("routerLink","/noticias/",t.id,"/",t.name,""),o.Jb(1),o.Tc(" ",t.name," ")}}const g=[{path:"",component:(()=>{class t{constructor(t,i,c,n){this.route=t,this.newsSvc=i,this.categoriesSvc=c,this.spinner=n,this.noticias=[],this.categorias=[],this.title="",this.content="",this.image=""}ngOnInit(){this.spinner.show(),this.route.params.subscribe(t=>{this.newsSvc.getById(t.id).subscribe(t=>{this.title=t.title,this.content=t.content,this.image=t.image,this.categoria=t.category.name}),this.spinner.hide()}),this.newsSvc.getNewsWithLimit(3).subscribe(t=>{this.noticias=t}),this.categoriesSvc.getAll().subscribe(t=>{this.categorias=t})}}return t.\u0275fac=function(i){return new(i||t)(o.Vb(e.a),o.Vb(a.a),o.Vb(r.a),o.Vb(s.c))},t.\u0275cmp=o.Pb({type:t,selectors:[["app-detalle-noticia"]],decls:21,vars:5,consts:[[1,"container"],[1,"row"],[1,"col-lg-9","col-sm-12"],[1,"titulo"],["alt","","width","100%",3,"src"],["id","mas_noticias",1,"col-lg-3","col-sm-12"],["class","col-md-12 col-sm-12",4,"ngFor","ngForOf"],["aria-label","Fish selection"],["color","primary","selected","",3,"routerLink",4,"ngFor","ngForOf"],[1,"col-md-12","col-sm-12"],[1,"card","flex-md-row","mb-4","box-shadow","h-md-250"],[1,"card-img-right","flex-auto",2,"width","100%","height","100px",3,"src"],[1,"title-caption"],[3,"routerLink"],["color","primary","selected","",3,"routerLink"]],template:function(t,i){1&t&&(o.bc(0,"div",0),o.bc(1,"div",1),o.bc(2,"div",2),o.bc(3,"h1",3),o.Rc(4),o.ac(),o.Wb(5,"hr"),o.Wb(6,"img",4),o.Wb(7,"br"),o.Wb(8,"br"),o.bc(9,"p"),o.Rc(10),o.ac(),o.ac(),o.bc(11,"div",5),o.bc(12,"h2"),o.Rc(13,"Tambi\xe9n te puede interesar"),o.ac(),o.Wb(14,"hr"),o.Pc(15,b,7,3,"div",6),o.bc(16,"h2"),o.Rc(17,"Categorias"),o.ac(),o.Wb(18,"hr"),o.bc(19,"mat-chip-list",7),o.Pc(20,m,2,3,"mat-chip",8),o.ac(),o.ac(),o.ac(),o.ac()),2&t&&(o.Jb(4),o.Tc(" ",i.title," "),o.Jb(2),o.vc("src",i.image,o.Ic),o.Jb(4),o.Tc(" ",i.content," "),o.Jb(5),o.vc("ngForOf",i.noticias),o.Jb(5),o.vc("ngForOf",i.categorias))},directives:[n.l,l.b,e.d,l.a,e.c],styles:[".titulo[_ngcontent-%COMP%]{margin-top:2rem;margin-bottom:.25rem;font-size:2.5rem}img[_ngcontent-%COMP%]{width:100%}h2[_ngcontent-%COMP%]{text-align:center}.blog-post-meta[_ngcontent-%COMP%]{margin-bottom:1.25rem;color:#999}p[_ngcontent-%COMP%]{white-space:pre-line}.title-caption[_ngcontent-%COMP%]{position:absolute;left:0;right:0;bottom:0;padding:10px;text-align:center;background-color:rgba(0,0,0,.75);transition:all .5s;transition-property:all;transition-duration:.5s;transition-timing-function:ease;transition-delay:0s}.title-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff}#mas_noticias[_ngcontent-%COMP%]{margin-top:4rem}"]}),t})()}];let h=(()=>{class t{}return t.\u0275mod=o.Tb({type:t}),t.\u0275inj=o.Sb({factory:function(i){return new(i||t)},imports:[[e.e.forChild(g)],e.e]}),t})();var d=c("vvyD");let p=(()=>{class t{}return t.\u0275mod=o.Tb({type:t}),t.\u0275inj=o.Sb({factory:function(i){return new(i||t)},imports:[[n.c,h,d.a]]}),t})()}}]);