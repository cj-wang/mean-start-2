import { Directive, OnInit, Input, Component, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
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
    private componentFactoryResolver: ComponentFactoryResolver) { }

  @Input() id: string;

  async ngOnInit() {
    const inputEl = this.el.nativeElement;

    // create NgxCheckboxComponent
    const checkboxComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxCheckboxComponent);
    const checkboxComponentRef = this.viewContainerRef.createComponent(checkboxComponentFactory);
    const checkboxEl = checkboxComponentRef.location.nativeElement;
    // the input might be moved by other directives e.g. ngxFormGroupRow
    // here we put the checkboxComponent into the input temporarily, so it will be moved together with the input
    inputEl.appendChild(checkboxEl);
    // afterwards move it out of the input and move the input into it
    setTimeout(function() {
      inputEl.parentNode.appendChild(checkboxEl);
      checkboxEl.firstChild.insertBefore(inputEl, checkboxEl.firstChild.firstChild);
    }, 0);

    // generate id if not set
    this.id = this.id || this.el.nativeElement.id;
    if (! this.id) {
      this.id = uuid();
      this.el.nativeElement.id = this.id;
    }

    // setup form group row
    checkboxComponentRef.instance.id = this.id;
  }

}
