import { Directive, HostListener, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[hammertime]'
})
export class HammertimeDirective {

  @Output() doubleTap = new EventEmitter();
  @Output() tripleTap = new EventEmitter();


  @Input('clickEvent') clickEvent;
  @HostListener('click', ['$event, $event.target'])
  onClick(event, targetElement) {
    console.log(event);
    console.log(targetElement);
  }

  constructor() { }

  @HostListener('tap', ['$event'])
  onTap(e) {
    console.log("TAP!")
    if (e.tapCount === 2) {
      this.doubleTap.emit(e);
    }
    if (e.tapCount === 3) {
      this.tripleTap.emit(e);
    }
  }

}
