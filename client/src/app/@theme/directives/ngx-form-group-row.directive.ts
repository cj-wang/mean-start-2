import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  template: `
    <div class="form-group row">
      <label for="{{id}}" class="col-sm-2 col-form-label text-right">{{label}}</label>
      <div class="col-sm-9"></div>
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
export class NgxFormGroupRowDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2) { }

  @Input() id: string;
  @Input() label: string;

  ngOnInit() {
    const inputEl = this.el.nativeElement;

    // create NgxFormGroupRowComponent
    const formGroupRowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxFormGroupRowComponent);
    const formGroupRowComponentRef = this.viewContainerRef.createComponent(formGroupRowComponentFactory);
    const rowEl = formGroupRowComponentRef.location.nativeElement.firstChild;

    // move input into form-group row
    this.renderer.insertBefore(inputEl.parentNode, rowEl, inputEl);
    this.renderer.appendChild(rowEl.lastChild, inputEl);

    // generate id if not set
    this.id = this.id || inputEl.id;
    if (! this.id) {
      this.id = uuid();
      this.renderer.setAttribute(inputEl, 'id', this.id);
    }

    // setup form group row
    formGroupRowComponentRef.instance.id = this.id;
    formGroupRowComponentRef.instance.label = this.label;
  }

}
