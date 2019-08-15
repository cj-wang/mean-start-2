import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ThemeModule } from '../@theme/theme.module';

import { HttpRequestInterceptor } from './interceptors/http-interceptor';

import { NgxFormGroupRowDirective, NgxFormGroupRowComponent } from './directives/ngx-form-group-row.directive';
import { NgxTypeaheadDirective, NgxTypeaheadIconComponent } from './directives/ngx-typeahead-directive';
import { NgxSelectDirective, NgxSelectOptionComponent, NgxSelectIconComponent } from './directives/ngx-select.directive';
import { NgxCheckboxDirective, NgxCheckboxComponent } from './directives/ngx-checkbox.directive';
import { TrueFalseValueDirective } from './directives/true-false-value.directive';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const COMPONENTS = [
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

export const COMMON_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [
    ThemeModule,
    NgbModule,
  ],
  exports: [
    ThemeModule,
    NgbModule,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class NgxCommonModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgxCommonModule,
      providers: [
        ...COMMON_PROVIDERS,
      ],
    };
  }
}
