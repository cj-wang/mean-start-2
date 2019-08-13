import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { NbCardModule, NbRouteTabsetModule } from '@nebular/theme';

import { NgxCommonModule } from '../../common/common.module';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    FormsModule,
    AppRoutingModule,
    NgxCommonModule,
    NbCardModule,
    NbRouteTabsetModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
