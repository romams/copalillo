import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'H. Ayuntamiento constitucional de Copalillo';
  opened=false;
  private destroy$ = new Subject<any>();
  constructor(private utilsSvc: UtilsService){
  }

  ngOnInit(): void{
    this.utilsSvc.sidebarOpened$
    .pipe(
      takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  ngOnDestroy():void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
