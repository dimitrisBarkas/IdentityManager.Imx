import { Component, Inject, OnInit } from '@angular/core';
import { EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'imx-data-explorer-plus-details',
  templateUrl: './data-explorer-plus-details.component.html',
  styleUrls: ['./data-explorer-plus-details.component.scss']
})
export class DataExplorerPlusDetailsComponent implements OnInit {
  lotsOfTabs: string[];
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  // Example mapping of tab labels to data arrays
  tabDataMapping: { [tabLabel: string]: any[] } = {
    'Tab 1': [{ column1: 'Data 1-1', column2: 'Data 1-2', column3: 'Data 1-3' }],
    'Tab 2': [{ column1: 'Data 2-1', column2: 'Data 2-2', column3: 'Data 2-3' }],
    // Add more mappings for each tab
  };

  constructor(@Inject(EUI_SIDESHEET_DATA) public data: any) {
    this.lotsOfTabs = new Array(10).fill(0).map((_, index) => `Tab ${index + 1}`);
    this.displayedColumns = ['column1', 'column2', 'column3']; // Adjust as per your data structure
  }

  ngOnInit(): void {
    // Optionally initialize dataSource for the first tab or based on some condition
    this.updateDataSourceForTab(this.lotsOfTabs[0]);
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    this.updateDataSourceForTab(tabLabel);
  }

  updateDataSourceForTab(tabLabel: string): void {
    const dataForTab = this.tabDataMapping[tabLabel];
    if (dataForTab) {
      this.dataSource.data = dataForTab;
    } else {
      // Handle the case where there is no data for the tab
      this.dataSource.data = [];
    }
  }
}
