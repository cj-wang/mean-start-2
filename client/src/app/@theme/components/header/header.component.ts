import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { filter } from 'rxjs/operators';

import { JwtPayload } from '../../../../../../shared/jwt-payload.interface';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: JwtPayload;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });
    this.menuService.onItemClick().pipe(
      filter(menu => menu.tag === 'userMenu' && menu.item.title === 'Log out'),
    ).subscribe(async menu => {
      this.authService.logout('email').subscribe(result => {
        this.router.navigate(['auth/logout']);
      });
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
