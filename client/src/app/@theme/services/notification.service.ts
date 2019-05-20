import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(public toastrService: NbToastrService) { }

  error(message: string, title = 'Error', duration = 10000) {
    return this.toastrService.danger(message, title, {
      duration,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

  info(message: string, title = 'Info', duration = 3000) {
    return this.toastrService.info(message, title, {
      duration,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

  wait(message: string, title = 'Processing', duration = 0) {
    return this.toastrService.primary(message, title, {
      duration,
      position: NbGlobalLogicalPosition.BOTTOM_END,
      destroyByClick: false,
      icon: 'nb-loop',
    });
  }

  success(message: string, title = 'Success', duration = 3000) {
    return this.toastrService.success(message, title, {
      duration,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

  warning(message: string, title = 'Warning', duration = 10000) {
    return this.toastrService.warning(message, title, {
      duration,
      position: NbGlobalLogicalPosition.BOTTOM_END,
    });
  }

}
