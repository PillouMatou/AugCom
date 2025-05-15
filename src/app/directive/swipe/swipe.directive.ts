import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {
  private startY: number | null = null;

  @Output() swipeUp = new EventEmitter<void>();
  @Output() swipeDown = new EventEmitter<void>();

  constructor() {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.startY = event.clientY;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.startY === null) return;

    const deltaY = event.clientY - this.startY;

    if (deltaY > 50) {
      this.swipeDown.emit();
    } else if (deltaY < -50) {
      this.swipeUp.emit();
    }

    this.startY = null;
  }
}
