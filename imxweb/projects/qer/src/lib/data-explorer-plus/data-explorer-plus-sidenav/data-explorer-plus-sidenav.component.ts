import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { EuiLoadingService } from '@elemental-ui/core';
import { CollectionLoadParameters, DisplayColumns, EntitySchema, IClientProperty, ValType, MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { QerApiService } from '../../qer-api-client.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { AppConfigService, DataSourceToolbarFilter, DataSourceToolbarSettings } from 'qbm';

interface UserObject{
  Column: string;
  Value: string;
  IdentQBMLimitedSQL: string;
}

@Component({
  selector: 'ccc-data-explorer-plus-sidenav',
  templateUrl: './data-explorer-plus-sidenav.component.html',
  styleUrls: ['./data-explorer-plus-sidenav.component.scss']
})
export class DataExplorerPlusSidenavComponent implements OnInit {

  categories: UserObject[] = [];

  constructor(private readonly config: AppConfigService) { }

  ngOnInit(): void {
    this.getPredefinedSQL('CCC_DE_Explorer1_Categories');
  }

  public async getPredefinedSQL(IdentQBMLimitedSQL: string): Promise<void> {
    try {
      const response = await this.config.apiClient.processRequest<UserObject[][]>(this.predefinedSQLDescriptor(IdentQBMLimitedSQL));
      this.categories = response.flatMap(category => category);
      console.log("API response:", response);
      response.forEach((categoryArray) => {
        categoryArray.forEach((item) => {
          console.log(`Column: ${item.Column}, Value: ${item.Value}`);
        });
      });
  
    } catch (error) {
      console.error('Error fetching predefined SQL data:', error);
    }
  }

  private predefinedSQLDescriptor (IdentQBMLimitedSQL: string): MethodDescriptor<UserObject> {
    return {
      path: `/portal/dataexplorer/predefinedSQL`,
      parameters: [
        {
          name: 'IdentQBMLimitedSQL',
          value: IdentQBMLimitedSQL,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }
}
