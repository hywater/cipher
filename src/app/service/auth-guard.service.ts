import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { GardenService } from './garden.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private gardenService: GardenService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  canLoad(route: Route) {
    return this.checkLogin();
  }

  async checkLogin(): Promise<boolean> {
    const userInfo = await this.gardenService.getUserInfo();
    if (userInfo.data) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
