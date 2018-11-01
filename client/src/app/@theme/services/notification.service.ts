import { Injectable } from '@angular/core';
import { ToasterConfig, ToasterService, BodyOutputType, Toast } from 'angular2-toaster';

@Injectable()
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

  showToast(type: string, title: string, body = '', timeout = 5000, showCloseButton = true) {
    return this.toasterService.pop({
      type: type,
      title: title,
      body: body,
      timeout: timeout,
      showCloseButton: showCloseButton,
    });
  }

  error(title: string, body = '', timeout = 0) {
    return this.showToast('error', title, body, timeout);
  }

  info(title: string, body = '', timeout = 2000) {
    return this.showToast('info', title, body, timeout);
  }

  wait(title: string, body = '', timeout = 0) {
    return this.showToast('wait', title, body, timeout, false);
  }

  success(title: string, body = '', timeout = 2000) {
    return this.showToast('success', title, body, timeout);
  }

  warning(title: string, body = '', timeout = 0) {
    return this.showToast('warning', title, body, timeout);
  }

  clear(toast?: Toast) {
    if (toast) {
      this.toasterService.clear(toast.toastId, toast.toastContainerId);
    } else {
      this.toasterService.clear();
    }
  }

}
