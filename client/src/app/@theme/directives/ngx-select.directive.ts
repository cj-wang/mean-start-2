import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  template: `
    <option *ngIf="! required" value=""></option>
    <option *ngFor="let option of options" value="{{option.value}}" [selected]="option.selected">{{option.display}}</option>
  `,
})
export class NgxSelectOptionComponent {
  options = [];
  required = true;
}

@Component({
  template: `
    <i class="fas fa-spinner fa-2x" *ngIf="loading"></i>
    <i class="fas fa-exclamation-circle fa-2x" *ngIf="error" title="{{error}}"></i>
  `,
  styles: ['i {position: absolute; right: -25px; top: 10px;}'],
})
export class NgxSelectIconComponent {
  loading = false;
  error = null;
}

@Directive({
  selector: '[ngxSelect]',
})
export class NgxSelectDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NotificationService) { }

  @Input() ngxSelect: () => Observable<any>;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() ngModel: string;
  @Input() required = true;

  async ngOnInit() {
    // create NgxSelectOptionComponent
    const optionComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSelectOptionComponent);
    const optionComponentRef = this.viewContainerRef.createComponent(optionComponentFactory);
    while (optionComponentRef.location.nativeElement.firstChild) {
      this.el.nativeElement.appendChild(optionComponentRef.location.nativeElement.firstChild);
    }
    const optionComponent = optionComponentRef.instance;
    optionComponent.required = this.required;
    // create NgxSelectIconComponent
    const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSelectIconComponent);
    const iconComponent = this.viewContainerRef.createComponent(iconComponentFactory).instance;
    // run query function
    try {
      iconComponent.loading = true;
      optionComponent.options = (await this.ngxSelect().toPromise()).map(option => ({
        value: option[this.valueField],
        display: option[this.displayField],
        selected: option[this.valueField] === this.ngModel,
      }));
      iconComponent.loading = false;
    } catch (err) {
      this.notificationService.clear();
      iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
    }
  }

}
