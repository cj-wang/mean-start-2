import { Component, OnDestroy } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent implements OnDestroy {

  alive = true;

  user: any = {
    email: 'Admin@email.com',
    password: 'password',
  };

  googleLogin() {
    this.service.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
