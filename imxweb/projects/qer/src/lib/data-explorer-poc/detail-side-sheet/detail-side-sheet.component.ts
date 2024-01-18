import { Component, OnInit, Inject, Input } from '@angular/core';
import { EuiLoadingService, EuiSidesheetRef, EuiSidesheetService, EUI_SIDESHEET_DATA } from '@elemental-ui/core';

@Component({
  selector: 'ccc-detail-side-sheet',
  templateUrl: './detail-side-sheet.component.html',
  styleUrls: ['./detail-side-sheet.component.scss']
})
export class DetailSideSheetComponent implements OnInit {

  constructor() { }
  
  @Input() isOpen: boolean = true;

  ngOnInit(): void {
  }

}
