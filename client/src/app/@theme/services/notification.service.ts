import { Injectable } from '@angular/core';
import { ToasterConfig, ToasterService, BodyOutputType, Toast } from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  toasterConfig = new ToasterConfig({
    animation: null,
    limit: 1,
    tapToDismiss: false,
    positionClass: 'toast-center',
    showCloseButton: true,
    newestOnTop: false,
    timeout: 2000,
    mouseoverTimerStop: true,
    preventDuplicates: false,
    bodyOutputType: BodyOutputType.TrustedHtml,
  });

  constructor(public toasterService: ToasterService) { }

  error(body: string, title = 'Error', timeout = 0, showCloseButton = true) {
    return this.toasterService.pop({
      type: 'error',
      body: body,
      title: title,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  info(body: string, title = 'Info', timeout = 2000, showCloseButton = true) {
    return this.toasterService.pop({
      type: 'info',
      body: body,
      title: title,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  wait(body: string, title = 'Processing', timeout = 0, showCloseButton = false) {
    return this.toasterService.pop({
      type: 'wait',
      body: body,
      title: title,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  success(body: string, title = 'Success', timeout = 2000, showCloseButton = true) {
    return this.toasterService.pop({
      type: 'success',
      body: body,
      title: title,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  warning(body: string, title = 'Warning', timeout = 0, showCloseButton = true) {
    return this.toasterService.pop({
      type: 'warning',
      body: body,
      title: title,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  clear(toast?: Toast) {
    if (toast) {
      this.toasterService.clear(toast.toastId, toast.toastContainerId);
    } else {
      this.toasterService.clear();
    }
  }

}
