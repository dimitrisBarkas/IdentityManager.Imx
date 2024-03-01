import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppConfigService } from 'qbm';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabGroup } from '@angular/material/tabs';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DataExplorerPlusService } from '../data-explorer-plus.service';

interface ExplorerItem {
  ConfigParm: string;
  Value: string;
  Children: ExplorerItem[];
}
interface IdentQBMLimitedSQLType {
  IdentQBMLimitedSQL: string | null;
  xKey: string | null;
  xSubKey: string | null;
}
@Component({
  selector: 'imx-data-explorer-plus-details',
  templateUrl: './data-explorer-plus-details.component.html',
  styleUrls: ['./data-explorer-plus-details.component.scss']
})
export class DataExplorerPlusDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  lotsOfTabs: string[];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  xKey: IdentQBMLimitedSQLType | null = null;
  IdentQBMLimitedSQL: IdentQBMLimitedSQLType | null = null;
  selectedCategory: string | null = null;
  private subscription: Subscription;
  configParm: string;
  sideNavOptions: { displayName: string; configParm: string }[] = [];
  dataSourcedynamic: ExplorerItem[];
  searchControl = new FormControl('');
  tabsItem: ExplorerItem[] = [];
  tabDataMapping: { [tabLabel: string]: any[] } = {
  };
  constructor(
    @Inject(EUI_SIDESHEET_DATA) public data: any,
    private readonly config: AppConfigService,
    private service: DataExplorerPlusService,
    private route: ActivatedRoute,) {
    this.lotsOfTabs = new Array(5).fill(0).map((_, index) => `Tab ${index + 1}`);
    console.log("Received in side sheet:", data.xKey, data.xSubKey, data.configParm);
  }

  async ngOnInit(): Promise<void>  {
    this.updateDataSourceForTab(this.lotsOfTabs[0]);
    await this.ExplorerList();
    this.getTabs(this.data.configParm);
  }

  applyFilter(): void {
    const filterValue = this.searchControl.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset the paginator to the first page (important if you have pagination)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getTabs(configParm: string): void {
    this.selectedCategory = configParm;
    this.IdentQBMLimitedSQL = null;
    
    //Get the tabs from the tree
    const findTabs = (items: ExplorerItem[]): string | null => {
      for (const item of items) {
        if (item.ConfigParm === configParm) {
          const detailsChildren= item.Children.find(child => child.ConfigParm === 'Details');
          this.tabsItem = detailsChildren.Children;
          return detailsChildren ? detailsChildren.Value : null;
        } else if (item.Children.length > 0) {
          
          const result = findTabs(item.Children);
          if (result) return result; 
        }
      }
      return null; // Return null if not found at all
    };

    findTabs(this.dataSourcedynamic);
  } 

  onTabChange(event: any): void {
    const selectedIndex = event;
    const selectedTabLabel = this.tabGroup._tabs.toArray()[selectedIndex].textLabel;
    console.log('Selected tab:', selectedTabLabel);
    
    //Find the select statement based on the tab selected by the user
    const findSelectStmt = (items: ExplorerItem[]): string | null => {
      for (const item of items) {
        if (item.Value === selectedTabLabel) {
          const selectStmtItem = item.Children.find(child => child.ConfigParm === 'selectStmt');
          return selectStmtItem ? selectStmtItem.Value : null;
        } else if (item.Children.length > 0) {
          
          const result = findSelectStmt(item.Children);
          if (result) return result; 
        }
      }
      return null; // Return null if not found at all
    };

    const selectStmtValue = findSelectStmt(this.dataSourcedynamic);
    if (selectStmtValue) {
      this.IdentQBMLimitedSQL = {
        IdentQBMLimitedSQL: selectStmtValue,
        xKey: this.data.xKey,
        xSubKey: "something"
      };
    }
    console.log('IdentQBMLimitedSQL in tab sidesheet:', this.IdentQBMLimitedSQL);
    this.executeSQL(this.IdentQBMLimitedSQL);
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


  public async ExplorerList(): Promise<void> {
    const explorers = await this.config.apiClient.processRequest<ExplorerItem[]>(this.GetExplorers());
    this.dataSourcedynamic = explorers;
  }

  private GetExplorers(): MethodDescriptor<void> {
    return {
      path: `/portal/dataexplorerplus/configparms`,
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  public async executeSQL(limitedSQL: IdentQBMLimitedSQLType): Promise<void> {
    this.dataSource.data = [];
    this.displayedColumns = [];

    const results = await this.config.apiClient.processRequest<any[]>(this.predefinedSQL(limitedSQL));
    if (results.length > 0) {
      this.dataSource.data = results.map(row => {
        const flattenedRow = {};
        row.forEach(column => {
          flattenedRow[column.Column] = column.Value;
        });
        return flattenedRow;
      });
    // Set displayed columns based on the first row keys but exclude 'xKey'
    this.displayedColumns = Object.keys(this.dataSource.data[0]).filter(key => key !== 'xKey' && key !== 'xSubKey');
    
    }
    if (this.paginator) {
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    }
  }

  private predefinedSQL(limitedSQL: IdentQBMLimitedSQLType): MethodDescriptor<void> {
    return {
      path: `/portal/predefinedsql/fulldynamic`,
      parameters: [
        {
          name: 'limitedSQL',
          value: limitedSQL,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

}