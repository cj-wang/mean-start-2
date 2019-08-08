import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbRouteTabsetModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  LayoutDirectionSwitcherComponent,
  SearchInputComponent,
  SwitcherComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';

import { NgxFormGroupRowDirective, NgxFormGroupRowComponent } from './directives/ngx-form-group-row.directive';
import { NgxTypeaheadDirective, NgxTypeaheadIconComponent } from './directives/ngx-typeahead-directive';
import { NgxSelectDirective, NgxSelectOptionComponent, NgxSelectIconComponent } from './directives/ngx-select.directive';
import { NgxCheckboxDirective, NgxCheckboxComponent } from './directives/ngx-checkbox.directive';
import { TrueFalseValueDirective } from './directives/true-false-value.directive';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbRouteTabsetModule,
];
const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  NgxFormGroupRowComponent,
  NgxTypeaheadIconComponent,
  NgxSelectOptionComponent,
  NgxSelectIconComponent,
  NgxCheckboxComponent,
];
const ENTRY_COMPONENTS = [
  NgxFormGroupRowComponent,
  NgxTypeaheadIconComponent,
  NgxSelectOptionComponent,
  NgxSelectIconComponent,
  NgxCheckboxComponent,
];
const DIRECTIVES = [
  NgxFormGroupRowDirective,
  NgxTypeaheadDirective,
  NgxSelectDirective,
  NgxCheckboxDirective,
  TrueFalseValueDirective,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [...BASE_MODULES, NgbModule, ...NB_MODULES],
  exports: [...BASE_MODULES, NgbModule, ...NB_MODULES, ...PIPES, ...COMPONENTS, ...DIRECTIVES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
    };
  }
}
