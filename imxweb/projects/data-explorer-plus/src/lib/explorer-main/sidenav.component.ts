import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DataExplorerNavItems} from './nav-items/nav-items.component';
import {DataExplorerTable} from './data-table/data-table.component';

/** @title Basic sidenav */
@Component({
  selector: 'explorer-main',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, DataExplorerNavItems, DataExplorerTable],
})
export class DataExplorerSidenav {
  
}