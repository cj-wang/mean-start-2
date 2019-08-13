import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth/services/auth-guard.service';

import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent,
    },
    {
      path: 'detail/:id',
      canActivate: [AuthGuard],
      component: HeroDetailComponent,
    },
    {
      path: 'heroes',
      canActivate: [AuthGuard],
      component: HeroesComponent,
    },
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
