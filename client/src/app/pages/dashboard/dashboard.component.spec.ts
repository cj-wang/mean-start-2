import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { HelloService } from '../services/hello.service';
import { User } from '../../../../../shared/user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let tokenValid = true;

  const user: User = {
    userId: '0',
    username: 'user',
    name : 'User',
  };

  const token: Partial<NbAuthToken> = {
    isValid: () => tokenValid,
    getPayload: () => user,
  };

  const authServiceStub: Partial<NbAuthService> = {
    onTokenChange : () => of(token as NbAuthToken),
  };

  const greeting = 'Hello, User!';

  const helloServiceStub: Partial<HelloService> = {
    hello: () => Promise.resolve(greeting),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {provide: NbAuthService, useValue: authServiceStub},
        {provide: HelloService, useValue: helloServiceStub},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get greeting when token is valid', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      expect(element.querySelector('p').textContent).toBe(greeting);
    });
  }));

  it('should show login button when token is not valid', async(() => {
    tokenValid = false;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      const loginLink = element.querySelector('a');
      expect(loginLink).toBeTruthy();
      expect(loginLink.textContent).toMatch(/Login/);
      expect(loginLink.getAttribute('href')).toBe('/auth/login');
    });
  }));
});
