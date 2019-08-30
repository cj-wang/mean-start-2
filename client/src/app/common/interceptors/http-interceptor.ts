import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {}, async (err: any) => {
      if (err instanceof HttpErrorResponse && request.url !== 'api/auth/refresh-token') {
        this.notificationService.error(err.error.message);
      }
    });
  }
}
