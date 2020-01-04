import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private credentialService: CredentialService, private route: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.credentialService.isLoggedIn()) {
      if (next.data.roles && next.data.roles.indexOf(this.credentialService.getUser().role) === -1) {
        if (this.credentialService.isOption) {
          this.route.navigate(['/home/optionrequests']);
        } else if (this.credentialService.isUser) {
          this.route.navigate(['/home/myrequests']);
        }
        return false;
      }
      return true;
    }
    this.route.navigate(['/professional'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
