import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  template: `
    <option *ngIf="! required" value="">{{emptyValueLabel}}</option>
    <option *ngFor="let option of options" value="{{option.value}}" [selected]="option.selected">{{option.label}}</option>
  `,
})
export class NgxSelectOptionComponent {
  options = [];
  required: boolean;
  emptyValueLabel: string;
}

@Component({
  template: `
    <i class="fas fa-spinner fa-2x" *ngIf="loading"></i>
    <i class="fas fa-exclamation-circle fa-2x" *ngIf="error" title="{{error}}"></i>
  `,
  styles: ['i {position: absolute; right: -25px; top: 5px;}'],
})
export class NgxSelectIconComponent {
  loading = false;
  error = null;
}

@Directive({
  selector: '[ngxSelect]',
  exportAs: 'ngxSelect',
})
export class NgxSelectDirective implements OnInit {

  private optionComponent: NgxSelectOptionComponent;
  private iconComponent: NgxSelectIconComponent;

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2) { }

  @Input() ngxSelect: () => Observable<any>;
  @Input() valueField: string;
  @Input() labelField: string;
  @Input() ngModel: string;
  @Input() required = false;
  @Input() emptyValueLabel = '';

  ngOnInit() {
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
    this.optionComponent = optionComponentRef.instance;
    this.optionComponent.required = this.required;
    this.optionComponent.emptyValueLabel = this.emptyValueLabel;

    // create NgxSelectIconComponent
    const iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxSelectIconComponent);
    const iconComponentRef = this.viewContainerRef.createComponent(iconComponentFactory);
    this.iconComponent = iconComponentRef.instance;
    const iconEl = iconComponentRef.location.nativeElement;
    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the iconComponent into the input temporarily, so the icons will be moved together with the input
    this.renderer.appendChild(selectEl, iconEl);
    // afterwards move it out of the input
    setTimeout(() => {
      this.renderer.insertBefore(selectEl.parentNode, iconEl, selectEl);
    }, 0);

    this.loadOptions();
  }

  async loadOptions() {
    try {
      this.iconComponent.loading = true;
      this.optionComponent.options = (await this.ngxSelect().toPromise()).map(option => ({
        value: option[this.valueField],
        label: option[this.labelField],
        selected: option[this.valueField] === this.ngModel,
      }));
      this.iconComponent.loading = false;
    } catch (err) {
      this.iconComponent.error = err.error.message || err.error.errorMessage || 'Error';
    }
  }

}
