import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../../shared/user';
import { HelloService } from '../services/hello.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  protected destroy$ = new Subject<void>();

  user: User;
  greeting: string;

  constructor(
    private authService: NbAuthService,
    private helloService: HelloService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(async (token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        this.greeting = await this.helloService.hello();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
