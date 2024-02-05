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

interface Category {
  Column: string;
  Value: string;
}

@Component({
  selector: 'ccc-data-explorer-plus-sidenav',
  templateUrl: './data-explorer-plus-sidenav.component.html',
  styleUrls: ['./data-explorer-plus-sidenav.component.scss']
})
export class DataExplorerPlusSidenavComponent implements OnInit {
  categories: Category[][] = [];
  selectedTab: string = ''; // Initialize selectedTab

  constructor(private readonly config: AppConfigService){}

  ngOnInit(): void {
    this.fetchSideNavCategories();
  }

  public async fetchSideNavCategories(): Promise<void> {
    try {
      const response = await this.config.apiClient.processRequest<Category[][]>(this.getSideNavDescriptor());
      // Assign the response directly to categories without any additional transformation
      this.categories = response;
      console.log("API response:", response);

      // Initialize selectedTab with the first category when data is loaded
      if (this.categories.length > 0 && this.categories[0].length > 0) {
        this.selectedTab = this.categories[0][0].Value;
      }
    } catch (error) {
      console.error('Error fetching categories data:', error);
    }
  }

  private getSideNavDescriptor(): MethodDescriptor<Category> {
    const parameters = [];
    return {
      path: `/portal/dataexplorer/categories`,
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

  // Handle tab selection
  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
}


/*   
  interface UserObject{
  Column: string;
  Value: string;
  IdentQBMLimitedSQL: string;
}



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
  } */
