import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2,
  Injector, NgZone, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Live } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { Live as _Live } from './ng-bootstrap/util/accessibility/live';
import { NotificationService } from '../services/notification.service';

@Component({
  template: `
    <i class="fas fa-spinner fa-2x" *ngIf="loading"></i>
    <i class="fas fa-exclamation-circle fa-2x" *ngIf="error" title="{{error}}"></i>
  `,
  styles: ['i {position: absolute; right: -25px; top: 10px;}'],
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

  constructor(
      private el: ElementRef,
      private viewContainerRef: ViewContainerRef,
      private renderer: Renderer2,
      private componentFactoryResolver: ComponentFactoryResolver,
      injector: Injector,
      ngZone: NgZone,
      config: NgbTypeaheadConfig,
      live: _Live,
      private notificationService: NotificationService) {
    super(el, viewContainerRef, renderer, injector, componentFactoryResolver, config, ngZone, live as any as Live);
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
        catchError((err) => {
          this.notificationService.clear();
          this.iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
          return of([]);
        }),
      )),
    );
  }

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

    super.ngOnInit();
  }

}
