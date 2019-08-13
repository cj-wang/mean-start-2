import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  template: `
    <div class="custom-control custom-checkbox">
      <label class="custom-control-label" for="{{id}}">&nbsp;</label>
    </div>
  `,
  styles: ['label {width: 1.25rem; margin-left: -1.5rem;}'],
})
export class NgxCheckboxComponent {
  id: string;
}

@Directive({
  selector: 'input[type=checkbox].custom-control-input',
})
export class NgxCheckboxDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2) { }

  @Input() id: string;

  ngOnInit() {
    const inputEl = this.el.nativeElement;

    // create NgxCheckboxComponent
    const checkboxComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxCheckboxComponent);
    const checkboxComponentRef = this.viewContainerRef.createComponent(checkboxComponentFactory);
    const checkboxEl = checkboxComponentRef.location.nativeElement.firstChild;

    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the checkboxComponent into the input temporarily, so it will be moved together with the input
    this.renderer.appendChild(inputEl, checkboxEl);
    // afterwards move it out of the input and move the input into it
    setTimeout(() => {
      this.renderer.insertBefore(inputEl.parentNode, checkboxEl, inputEl);
      this.renderer.insertBefore(checkboxEl, inputEl, checkboxEl.firstChild);
    }, 0);

    // generate id if not set
    this.id = this.id || inputEl.id;
    if (! this.id) {
      this.id = uuid();
      this.renderer.setAttribute(inputEl, 'id', this.id);
    }

    // setup checkbox componenet
    checkboxComponentRef.instance.id = this.id;
  }

}
