import { Component } from '@angular/core';

import 'style-loader!angular2-toaster/toaster.css';

import { MENU_ITEMS } from './pages-menu';
import { NotificationService } from './notification.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
    <toaster-container [toasterconfig]="notificationService.toasterConfig"></toaster-container>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private notificationService: NotificationService) { }

}
