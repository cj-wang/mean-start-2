import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NbToastrModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { NgxCommonModule } from '../../../common/common.module';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ThemeModule.forRoot(),
        NgxCommonModule,
        NbCardModule,
        NbToastrModule.forRoot(),
      ],
      providers: [ HeroService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
