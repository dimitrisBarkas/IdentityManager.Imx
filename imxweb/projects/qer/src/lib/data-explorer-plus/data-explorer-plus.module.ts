import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { TranslateModule } from '@ngx-translate/core';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { DataSourceToolbarModule, DataTableModule, LdsReplaceModule, QbmModule } from 'qbm';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataExplorerPlusComponent } from './data-explorer-plus.component';
import { DataExplorerPlusSidenavComponent } from './data-explorer-plus-sidenav/data-explorer-plus-sidenav.component';
import { DataExplorerPlusContentComponent } from './data-explorer-plus-content/data-explorer-plus-content.component';

@NgModule({
  declarations: [
    DataExplorerPlusComponent,
    DataExplorerPlusSidenavComponent,
    DataExplorerPlusContentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    TranslateModule,
    LdsReplaceModule,
    EuiCoreModule,
    EuiMaterialModule,
    DataSourceToolbarModule,
    DataTableModule,
    QbmModule,
    MatSidenavModule
  ],
  exports: [
  ]
})
export class DataExplorerPlusModule { }
