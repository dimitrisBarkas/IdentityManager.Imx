import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { DataSourceToolbarModule, DataTableModule, LdsReplaceModule, QbmModule } from 'qbm';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataExplorerPocComponentComponent } from './data-explorer-poc-component/data-explorer-poc-component.component';
@NgModule({
  declarations: [
    DataExplorerPocComponentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
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
export class DataExplorerPocModule {}
