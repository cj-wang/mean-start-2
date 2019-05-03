import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(public toastrService: NbToastrService) { }

  error(message: string, title = 'Error', duration = 10000) {
    return this.toastrService.danger(message, title, {
      duration,
    });
  }

  info(message: string, title = 'Info', duration = 3000) {
    return this.toastrService.info(message, title, {
      duration,
    });
  }

  wait(message: string, title = 'Processing', duration = 0) {
    return this.toastrService.primary(message, title, {
      duration,
      destroyByClick: false,
      icon: 'nb-loop',
    });
  }

  success(message: string, title = 'Success', duration = 3000) {
    return this.toastrService.success(message, title, {
      duration,
    });
  }

  warning(message: string, title = 'Warning', duration = 10000) {
    return this.toastrService.warning(message, title, {
      duration,
    });
  }

}
