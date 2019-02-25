import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterService } from 'angular2-toaster';

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
        ThemeModule
      ],
      providers: [ HeroService, MessageService, ToasterService ]
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
