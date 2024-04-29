import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccc-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss']
})
export class CustomPopupComponent {
  @Input() firstName: string;
  @Input() lastName: string;
  @Output() closePopup = new EventEmitter<void>();  // This will notify the parent component

  close() {
    this.closePopup.emit();  // Emit an event when close is called
  }
}