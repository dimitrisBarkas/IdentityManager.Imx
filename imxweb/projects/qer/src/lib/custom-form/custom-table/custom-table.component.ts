import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'ccc-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  dataSource: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'address', 'email'];

/*   @Output() closeTable = new EventEmitter<void>(); */
  @Output() showPopupEvent = new EventEmitter<void>(); // Add this event

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.dataSource = this.formDataService.formDataList;
  }

/*   onClose() {
    this.closeTable.emit();  // Existing event to close the table
  } */

  onShowPopup() {
    this.showPopupEvent.emit();  // Trigger the popup from here
  }
}
