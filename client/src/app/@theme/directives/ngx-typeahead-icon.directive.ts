import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
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
  selector: '[ngxTypeaheadIcon]',
})
export class NgxTypeaheadIconDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NotificationService) { }

  @Input('ngxTypeaheadIcon') ngbTypeahead;

  ngOnInit() {
    const inputEl = this.el.nativeElement;

    // create NgxTypeaheadIconComponent
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxTypeaheadIconComponent);
    const iconComponentRef = this.viewContainerRef.createComponent(componentFactory);
    const iconEl = iconComponentRef.location.nativeElement;
    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the iconComponent into the input temporarily, so the icons will be moved together with the input
    inputEl.appendChild(iconEl);
    // afterwards move it out of the input
    setTimeout(function() {
      inputEl.parentNode.insertBefore(iconEl, inputEl);
    }, 0);

    // delegate query function
    const iconComponent = iconComponentRef.instance;
    const query = this.ngbTypeahead.ngbTypeahead;
    this.ngbTypeahead.ngbTypeahead = (text$: Observable<string>) => text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        iconComponent.error = null;
        iconComponent.loading = true;
      }),
      switchMap(term => (term.length < 2 ? of([]) : query(term)).pipe(
        tap(() => iconComponent.loading = false),
        catchError((err) => {
          this.notificationService.clear();
          iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
          return of([]);
        }),
      )),
    );
    this.ngbTypeahead.ngOnDestroy();
    this.ngbTypeahead.ngOnInit();
  }

}
