import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'ngb-ex-typeahead',
  templateUrl: './ngb-ex-typeahead.component.html',
  styleUrls: ['./ngb-ex-typeahead.component.scss'],
})
export class NgbExTypeaheadComponent implements OnInit {

  querying = false;
  failed = false;
  error = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  private _query;

  @Input() set query(query) {
    this._query = query;
  }

  get query() {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.querying = true;
        this.failed = false;
      }),
      switchMap(term => term.length < 2 ? of([]) : this._query(term).pipe(
        tap(() => this.failed = false),
        catchError((err) => {
          this.notificationService.clear();
          this.failed = true;
          this.error = err.error.message || err.error.errorMessage;
          return of([]);
        }),
      )),
      tap(() => this.querying = false),
    );
  }

}
