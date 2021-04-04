import { OnDestroy } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
isAdmin = '';
isLogged: boolean = false;

private destroy$ = new Subject<any>();

@Output() toggleSidenav = new EventEmitter<void>();
  
constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    
    
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {

      this.isAdmin = user?.role;

      if(localStorage.getItem('user')){
        
        this.isLogged = true;

      }

    });
    

  }

  ngOnDestroy():void{ 
    this.destroy$.next({});
    this.destroy$.complete();
  }
  
  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }

  onLogout(){
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.isLogged = false;
  }
}
