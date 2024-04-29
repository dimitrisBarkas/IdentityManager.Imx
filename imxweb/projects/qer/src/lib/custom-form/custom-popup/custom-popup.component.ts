import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccc-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss'],
})
export class CustomPopupComponent {
  @Input() firstName: string;
  @Input() lastName: string;
  @Output() closePopup = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }
}
