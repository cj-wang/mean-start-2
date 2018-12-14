import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
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
    private componentFactoryResolver: ComponentFactoryResolver) { }

  @Input() id: string;
  @Input() label: string;

  async ngOnInit() {
    // create NgxFormGroupRowComponent
    const formGroupRowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxFormGroupRowComponent);
    const formGroupRowComponentRef = this.viewContainerRef.createComponent(formGroupRowComponentFactory);
    // move input into form-group row
    const inputContainer = formGroupRowComponentRef.location.nativeElement.firstChild.lastChild;
    this.el.nativeElement.parentNode.insertBefore(formGroupRowComponentRef.location.nativeElement.firstChild, this.el.nativeElement);
    inputContainer.appendChild(this.el.nativeElement);

    // generate id if not set
    this.id = this.id || this.el.nativeElement.id;
    if (! this.id) {
      this.id = uuid();
      this.el.nativeElement.id = this.id;
    }

    // setup form group row
    formGroupRowComponentRef.instance.id = this.id;
    formGroupRowComponentRef.instance.label = this.label;
  }

}
