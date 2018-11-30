import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
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

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NotificationService) { }

  @Input('ngxTypeaheadIcon') ngbTypeahead;

  ngOnInit() {
    // create NgxTypeaheadIconComponent
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxTypeaheadIconComponent);
    const iconComponent = this.viewContainerRef.createComponent(componentFactory).instance;
    // delegate query function
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
