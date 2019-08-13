import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2,
  Injector, NgZone, forwardRef, Inject, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, catchError } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Live } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { Live as _Live } from './ng-bootstrap/util/accessibility/live';

@Component({
  template: `
    <i class="fas fa-spinner fa-2x" *ngIf="loading"></i>
    <i class="fas fa-exclamation-circle fa-2x" *ngIf="error" title="{{error}}"></i>
  `,
  styles: ['i {position: absolute; right: -25px; top: 5px;}'],
})
export class NgxTypeaheadIconComponent {
  loading = false;
  error = null;
}

@Directive({
  selector: 'input[ngxTypeahead]',
  exportAs: 'ngxTypeahead',
  host: {
    '(blur)': 'handleBlur()',
    '[class.open]': 'isPopupOpen()',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown)': 'handleKeyDown($event)',
    '[autocomplete]': 'autocomplete',
    'autocapitalize': 'off',
    'autocorrect': 'off',
    'role': 'combobox',
    'aria-multiline': 'false',
    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
    '[attr.aria-activedescendant]': 'activeDescendant',
    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
    '[attr.aria-expanded]': 'isPopupOpen()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxTypeaheadDirective),
      multi: true,
    },
  ],
})
export class NgxTypeaheadDirective extends NgbTypeahead implements OnInit {

  private iconComponent: NgxTypeaheadIconComponent;

  private queryResult: any = {};

  constructor(
      private el: ElementRef<HTMLInputElement>,
      private viewContainerRef: ViewContainerRef,
      private renderer: Renderer2,
      injector: Injector,
      private componentFactoryResolver: ComponentFactoryResolver,
      config: NgbTypeaheadConfig,
      ngZone: NgZone,
      live: _Live,
      @Inject(DOCUMENT) document: any,
      changeDetector: ChangeDetectorRef,
      applicationRef: ApplicationRef) {
    super(el, viewContainerRef, renderer, injector, componentFactoryResolver,
        config, ngZone, live as any as Live, document, ngZone, changeDetector, applicationRef);
  }

  @Input() valueField: string;

  @Input() set labelField(labelField: string) {
    this.resultFormatter = this.inputFormatter = value => value[labelField];
  }

  @Input() set ngxTypeahead(query: (term: string) => Observable<any[]>) {
    this.ngbTypeahead = (text$: Observable<string>) => text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.iconComponent.error = null;
        this.iconComponent.loading = true;
      }),
      switchMap(term => (term.length < 2 ? of([]) : query(term)).pipe(
        tap(() => this.iconComponent.loading = false),
        // extract value by this.valueField if provided
        map(queryResult => this.valueField ? queryResult.map(item => {
          this.queryResult[item[this.valueField]] = item;
          return item[this.valueField];
        }) : queryResult),
        catchError(err => {
          this.iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
          return of([]);
        }),
      )),
    );
  }

  @Input() getByValue: (value: string) => Observable<any>;

  ngOnInit() {
    const inputEl = this.el.nativeElement;

    // create NgxTypeaheadIconComponent
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxTypeaheadIconComponent);
    const iconComponentRef = this.viewContainerRef.createComponent(componentFactory);
    this.iconComponent = iconComponentRef.instance;
    const iconEl = iconComponentRef.location.nativeElement;
    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the iconComponent into the input temporarily, so the icons will be moved together with the input
    this.renderer.appendChild(inputEl, iconEl);
    // afterwards move it out of the input
    setTimeout(() => {
      this.renderer.insertBefore(inputEl.parentNode, iconEl, inputEl);
    }, 0);

    // need to get the value object if this.valueField is used
    if (this.valueField) {
      if (this.resultFormatter) {
        const _resultFormatter = this.resultFormatter;
        this.resultFormatter = value => _resultFormatter(this.queryResult[value]);
      }
      if (this.inputFormatter) {
        const _inputFormatter = this.inputFormatter;
        this.inputFormatter = value => {
          if (! value) {
            return '';
          } else if (this.queryResult[value]) {
            return _inputFormatter(this.queryResult[value]);
          } else {
            this.iconComponent.error = null;
            this.iconComponent.loading = true;
            if (this.getByValue) {
              this.getByValue(value).subscribe(valueObject => {
                this.iconComponent.loading = false;
                this.queryResult[value] = valueObject;
                super.writeValue(value);
              }, err => {
                this.iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
              });
              return '...';
            } else {
              this.iconComponent.error = 'Error';
              throw new Error('getByValue function not specified for ngxTypeahead');
            }
          }
        };
      }
    }

    super.ngOnInit();
  }

}
