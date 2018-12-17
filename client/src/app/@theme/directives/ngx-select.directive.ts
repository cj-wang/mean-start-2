import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
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
    private renderer: Renderer2,
    private notificationService: NotificationService) { }

  @Input() ngxSelect: () => Observable<any>;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() ngModel: string;
  @Input() required = true;

  async ngOnInit() {
    const selectEl = this.el.nativeElement;

    // create NgxSelectOptionComponent
    const optionComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSelectOptionComponent);
    const optionComponentRef = this.viewContainerRef.createComponent(optionComponentFactory);
    const optionEl = optionComponentRef.location.nativeElement;
    // move the options into the select
    while (optionEl.firstChild) {
      this.renderer.appendChild(selectEl, optionEl.firstChild);
    }
    // setup optionComponent
    const optionComponent = optionComponentRef.instance;
    optionComponent.required = this.required;

    // create NgxSelectIconComponent
    const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSelectIconComponent);
    const iconComponentRef = this.viewContainerRef.createComponent(iconComponentFactory);
    const iconEl = iconComponentRef.location.nativeElement;
    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the iconComponent into the input temporarily, so the icons will be moved together with the input
    this.renderer.appendChild(selectEl, iconEl);
    // afterwards move it out of the input
    setTimeout(() => {
      this.renderer.insertBefore(selectEl.parentNode, iconEl, selectEl);
    }, 0);

    // run query function
    const iconComponent = iconComponentRef.instance;
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
