import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NgxLoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
    NbAuthModule,
    NgxAuthRoutingModule,
  ],
  declarations: [
    NgxLoginComponent,
  ],
})
export class NgxAuthModule {
}
