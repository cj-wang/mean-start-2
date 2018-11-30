import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Directive({
  selector: '[ngxTypeaheadIcon]',
})
export class NgxTypeaheadIconDirective implements OnInit {

  private _input;
  private _query;

  constructor(private el: ElementRef, private notificationService: NotificationService) { }

  @Input('ngxTypeaheadIcon') set input(input) {
    this._input = input;
    this._query = input.ngbTypeahead;
  }

  ngOnInit() {
    this._input.ngbTypeahead = (text$: Observable<string>) => text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.clear();
        this.showLoading();
      }),
      switchMap(term => (term.length < 2 ? of([]) : this._query(term)).pipe(
        tap(() => this.clear()),
        catchError((err) => {
          this.notificationService.clear();
          this.showError(err.error.message || err.error.errorMessage);
          return of([]);
        }),
      )),
    );
    this._input.ngOnDestroy();
    this._input.ngOnInit();
  }

  showLoading() {
    this.el.nativeElement.parentElement.insertAdjacentHTML('beforeend',
      `<i id="loadingIcon" class="fas fa-spinner fa-2x" *ngIf="querying"
        style="position: absolute; right: -25px; top: 10px;"></i>`);
  }

  showError(error: string) {
    this.el.nativeElement.parentElement.insertAdjacentHTML('beforeend',
      `<i id="errorIcon" class="fas fa-exclamation-circle fa-2x" *ngIf="querying" title="${error}"
        style="position: absolute; right: -25px; top: 10px;"></i>`);
  }

  clear() {
    this.el.nativeElement.parentElement.querySelectorAll('i').forEach(icon => {
      this.el.nativeElement.parentElement.removeChild(icon);
    });
  }

}
