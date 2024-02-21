import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EUI_SIDESHEET_DATA, EuiSidesheetService } from '@elemental-ui/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataExplorerPlusService, ExplorerItem } from '../data-explorer-plus.service';
import { DataExplorerPlusComponent } from '../data-explorer-plus.component';
import { AppConfigService } from 'qbm';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

interface IdentQBMLimitedSQLType {
  IdentQBMLimitedSQL: string | null;
  xKey: string | null;
  xSubKey: string | null;
}

@Component({
  selector: 'app-data-explorer-plus-details',
  templateUrl: './data-explorer-plus-details.component.html',
  styleUrls: ['./data-explorer-plus-details.component.scss']
})

export class DataExplorerPlusDetailsComponent implements OnInit {
  private styleTag: HTMLStyleElement;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  lotsOfTabs: string[];
  xKey: IdentQBMLimitedSQLType | null = null;
  IdentQBMLimitedSQL: IdentQBMLimitedSQLType | null = null;
  selectedCategory: string | null = null;
  private subscription: Subscription;
  configParm: string;
  sideNavOptions: { displayName: string; configParm: string }[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSourcedynamic: ExplorerItem[];
 
  tabDataMapping: { [tabLabel: string]: any[] } = {};

  constructor(
    @Inject(EUI_SIDESHEET_DATA) public data: any,
    private readonly config: AppConfigService,
    private service: DataExplorerPlusService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
      this.lotsOfTabs = new Array(5).fill(0).map((_, index) => `Tab ${index + 1}`);
      console.log("Received in side sheet:", data.xKey, data.xSubKey);
    }

    public ngOnInit(): void {
      this.addCustomStyles();
      this.subscription = this.route.params.subscribe(async params => {
        // Check if configParm has actually changed to prevent unnecessary reloads
        if (this.configParm !== params['configParm']) {
          this.configParm = params['configParm'];

          // Reset component state for the new configParm
          this.resetComponentState();

          console.log(this.configParm);

          await this.ExplorerList();
          console.log(this.dataSourcedynamic);
          this.setSideNavOptions();
          console.log(this.sideNavOptions);
          this.cdr.detectChanges();
        }
      });
    }

    private addCustomStyles(): void {
      const styleContent = `.pageContent { margin: 0 !important; }`;
      this.styleTag = this.renderer.createElement('style');
      this.styleTag.textContent = styleContent;
      this.renderer.appendChild(this.document.head, this.styleTag);
    }

    private resetComponentState(): void {
      // Clear the MatTableDataSource
      this.dataSource.data = [];
      // Reset displayed columns
      this.displayedColumns = [];
      // Optionally reset the paginator to the first page
      if (this.paginator) {
        this.paginator.firstPage();
      }
      // Reset any additional state as needed
      this.selectedCategory = null;
      this.IdentQBMLimitedSQL = null;
      // Ensure any other state relevant to the view is reset or reinitialized here
    }

  setSideNavOptions() {
    const matchingConfig = this.dataSourcedynamic.find(item => item.ConfigParm === this.configParm);
    if (matchingConfig) {
      this.sideNavOptions = matchingConfig.Children
        .filter(child =>
          child.ConfigParm !== 'Endpoint' &&
          child.ConfigParm !== 'selectStmt' &&
          child.Children.some(grandChild => grandChild.ConfigParm === 'DisplayName')
        )
        .map(child => {
          const displayNameChild = child.Children.find(grandChild => grandChild.ConfigParm === 'DisplayName');
          return {
            displayName: displayNameChild ? displayNameChild.Value : 'Unknown',
            configParm: child.ConfigParm
          };
        });
    }
    this.cdr.detectChanges();

    // Automatically select the first category if available
    if (this.sideNavOptions.length > 0) {
      const firstOption = this.sideNavOptions[0].configParm;
      // Delay the selection to ensure view initialization is complete
      setTimeout(() => this.selectOption(firstOption), 0);
    }
  }

  public async ExplorerList(): Promise<void> {
    const explorers = await this.config.apiClient.processRequest<ExplorerItem[]>(this.GetExplorers());
    this.dataSourcedynamic = explorers;
    this.cdr.detectChanges();
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
 
  public selectOption(configParm: string): void {
    this.selectedCategory = configParm;
    this.IdentQBMLimitedSQL = null;
 
    const selectStmtValue = this.service.findSelectStmt(this.dataSourcedynamic, configParm);
    if (selectStmtValue) {
      this.IdentQBMLimitedSQL = {
        IdentQBMLimitedSQL: selectStmtValue,
        xKey: this.data.xKey,
        xSubKey: "something"
      };
    }
    console.log('IdentQBMLimitedSQL:', this.IdentQBMLimitedSQL);
    console.log(this.selectedCategory);
    this.fetchPersonDetailsByXKey(this.IdentQBMLimitedSQL);
  }

  public async fetchPersonDetailsByXKey(limitedSQL: IdentQBMLimitedSQLType): Promise<void> {
    const results = await this.config.apiClient.processRequest<any[]>(this.fetchDescriptor(limitedSQL));
   /*  if (results.length > 0) { */
      this.dataSource.data = results.map(row => {
        const flattenedRow = {};
        row.forEach(column => {
          flattenedRow[column.Column] = column.Value;
        });
        return flattenedRow;
      });
      // Set displayed columns based on the first row keys but exclude 'xKey' and 'xSubKey'
      this.displayedColumns = Object.keys(this.dataSource.data[0]).filter(key => key !== 'xKey' && key !== 'xSubKey');
    /* } */
    if (this.paginator) {
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    }
    console.log('DataSource(SideSheet):', this.dataSource.data);
  }


  private fetchDescriptor(limitedSQL: IdentQBMLimitedSQLType): MethodDescriptor<void> {
    return {
      path: "/portal/predefinedsql/fulldynamic",
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