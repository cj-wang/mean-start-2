import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { JwtPayload } from '../../../../../shared/jwt-payload.interface';
import { HelloService } from '../services/hello.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user: JwtPayload;
  greeting: string;

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private helloService: HelloService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe(async (token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        this.greeting = await this.helloService.hello();
      }
    });
  }

  login() {
    this.router.navigate(['auth/login']);
  }

}
