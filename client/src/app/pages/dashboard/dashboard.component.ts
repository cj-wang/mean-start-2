import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { User } from '../../../../../shared/user';
import { HelloService } from '../services/hello.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  alive = true;

  user: User;
  greeting: string;

  constructor(
    private authService: NbAuthService,
    private helloService: HelloService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().pipe(
      takeWhile(() => this.alive),
    )
    .subscribe(async (token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        this.greeting = await this.helloService.hello();
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
