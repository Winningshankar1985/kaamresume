import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; 
import { LocalstorageService } from '../localStorage/localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
loggedin:boolean=false;
  constructor(

    private loginServ: AuthService,
    private router: Router,
    private localStorage: LocalstorageService,
  ) {
  
   }


//   canActivate(
//     next: ActivatedRouteSnapshot,

//   state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    
       
//       if(!this.loginServ.isLoggedin()){
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;
//  }



  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean  {
    const loggedIn: any = JSON.parse(localStorage.getItem('activate') ?? 'false');
    console.log(loggedIn,"parent fffffffffffffffffff");
      
    if(!loggedIn){

      console.log(loggedIn, "parent 0000000000000000000");
          // this.router.navigate(['/']);
            window.location.href = '/';
          return false;
        }
        return true;
  }


}

@Injectable({
  providedIn: 'root'
})
export class AuthChildGaurd implements CanActivateChild {
  loggedin: boolean = false;
  constructor(

    private loginServ: AuthService,
    private router: Router,
    private localStorage: LocalstorageService,
  ) {

  }
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const loggedIn: any = JSON.parse(localStorage.getItem('activate') ?? 'false');
    console.log(loggedIn, "child fffffffffffffffffff");
    if (!loggedIn) {
      console.log(loggedIn, "child 11111111111111111111");
      // this.router.navigate(['/']);
      window.location.href = '/';
      return false;
    }


    return true;
  }

}
