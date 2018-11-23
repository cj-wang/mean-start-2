import { Component } from '@angular/core';
import { NotificationService } from '../../@theme/services/notification.service';
import { HelloService } from '../services/hello.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private notificationService: NotificationService, private helloService: HelloService) { }

  async hello() {
    const greeting = await this.helloService.hello('world');
    this.notificationService.success(greeting);
  }

}
