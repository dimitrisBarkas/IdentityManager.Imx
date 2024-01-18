import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { EuiLoadingService } from '@elemental-ui/core';
import { CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType, MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { QerApiService } from '../../qer-api-client.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService, DataSourceToolbarFilter, DataSourceToolbarSettings } from 'qbm';
import { DetailSideSheetComponent } from '../detail-side-sheet/detail-side-sheet.component';
import { MatDrawer } from '@angular/material/sidenav';

interface UserObject {
  [key: string]: any; // Use a flexible key type to accommodate any property
}

@Component({
  selector: 'ccc-data-explorer-poc-component',
  templateUrl: './data-explorer-poc-component.component.html',
  styleUrls: ['./data-explorer-poc-component.component.scss'],
})
export class DataExplorerPocComponentComponent implements OnInit {
  
  displayedColumns: string[] = []; // Array to hold column keys
  tableDataSource: MatTableDataSource<UserObject> = new MatTableDataSource<UserObject>([]);
  
  // Initialize 'selectedTab' to the default tab that should be open
  selectedTab: string = 'businessRoles';

  // Method to set the selectedTab, called when a nav item is clicked
  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private readonly config: AppConfigService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchBusinessRoleData();
  }

  openDetailSideSheet(): void {
    this.drawer.toggle(); // This will open the drawer as an overlay
  }

  private async fetchBusinessRoleData(): Promise<void> {
    try {
      const response = await this.config.apiClient.processRequest<UserObject[]>(this.getBusinessRoleDataDescriptor());
      this.updateColumns(response);
      console.log("API response:", response);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  }

  private getBusinessRoleDataDescriptor(): MethodDescriptor<UserObject> {
    return {
      path: `/portal/ORG_GET`,
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get()
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  private updateColumns(data: UserObject[]): void {
    if (data.length > 0) {
      this.displayedColumns = Object.keys(data[0]);
      this.tableDataSource.data = data;
    }
  }
}