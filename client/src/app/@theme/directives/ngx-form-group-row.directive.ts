import { Directive, OnInit, DoCheck, Component, TemplateRef, ViewContainerRef, ComponentFactoryResolver, Renderer2} from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  template: `
    <div class="form-group row">
      <label for="{{id}}" class="col-sm-2 col-form-label text-right">{{label}}</label>
      <div class="col-sm-9">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NgxFormGroupRowComponent {
  id: string;
  label: string;
}

@Directive({
  selector: '[ngxFormGroupRow]',
})
export class NgxFormGroupRowDirective implements OnInit, DoCheck {

  private templateView;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2) { }

  ngOnInit() {
    // create NgxFormGroupRowComponent
    this.templateView = this.templateRef.createEmbeddedView({});
    const formGroupRowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxFormGroupRowComponent);
    const formGroupRowComponentRef = this.viewContainerRef.createComponent(
      formGroupRowComponentFactory, null, this.viewContainerRef.injector, [this.templateView.rootNodes]);

    const inputEl = this.templateView.rootNodes[0];
    // generate id if not set
    if (! inputEl.id) {
      this.renderer.setAttribute(inputEl, 'id', uuid());
    }

    // setup form group row
    const formGroupRowComponent = formGroupRowComponentRef.instance;
    formGroupRowComponent.id = inputEl.id;
    formGroupRowComponent.label = inputEl.getAttribute('label');
  }

  ngDoCheck() {
    this.templateView.detectChanges();
  }

}
