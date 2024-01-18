import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExplorerPlusComponent } from './data-explorer-plus.component';
import { DataExplorerPlusSidenavComponent } from './data-explorer-plus-sidenav/data-explorer-plus-sidenav.component';



@NgModule({
  declarations: [
    DataExplorerPlusComponent,
    DataExplorerPlusSidenavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class DataExplorerPlusModule { }
