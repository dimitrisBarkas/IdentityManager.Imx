import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccc-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent {
  @Input() dataSource: any[];
  @Output() closeTable = new EventEmitter<void>();
  @Output() addAnotherEntry = new EventEmitter<void>();

  displayedColumns: string[] = ['firstname', 'lastname', 'address', 'email'];

  onClose() {
    this.closeTable.emit();
  }

  onAddEntry() {
    this.addAnotherEntry.emit();
  }
}
