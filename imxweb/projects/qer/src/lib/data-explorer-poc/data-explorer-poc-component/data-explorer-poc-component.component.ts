import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EuiLoadingService } from '@elemental-ui/core';
import { CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType, MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { QerApiService } from '../../qer-api-client.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { AppConfigService, DataSourceToolbarFilter, DataSourceToolbarSettings } from 'qbm';

interface UserObject{
  Ident_Org: string;
  UID_OrgRoot: string;
  FullPath: string;
}

@Component({
  selector: 'ccc-data-explorer-poc-component',
  templateUrl: './data-explorer-poc-component.component.html',
  styleUrls: ['./data-explorer-poc-component.component.scss'],
})
export class DataExplorerPocComponentComponent implements OnInit {
  tableDataSource: MatTableDataSource<UserObject> = new MatTableDataSource<UserObject>([]);
  businessRoles: UserObject[] = [];

  // Initialize 'selectedTab' to the default tab that should be open
  selectedTab: string = 'businessRoles';

  // Method to set the selectedTab, called when a nav item is clicked
  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  constructor(private readonly config: AppConfigService){}

  ngOnInit(): void {
    this.fetchBusinessRoleData();
  }

   public async fetchBusinessRoleData(): Promise<void> {
    try {
      const response = await this.config.apiClient.processRequest<UserObject[]>(this.getBusinessRoleDataDescriptor());
      this.businessRoles = response;
      this.tableDataSource.data = this.businessRoles;
      console.log("API response:", response);
      console.log("BR Array:", this.businessRoles);
      console.log("Table data", this.tableDataSource.data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  }

  private getBusinessRoleDataDescriptor(): MethodDescriptor<UserObject> {
    const parameters = [];
    return {
      path: `/portal/ORG_GET`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get()
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

}
