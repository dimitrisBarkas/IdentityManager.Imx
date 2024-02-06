import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * @title Basic list
 */
@Component({
  selector: 'nav-items',
  templateUrl: 'nav-items.component.html',
  styleUrls: ['nav-items.component.scss'],
  standalone: true,
  imports: [MatListModule],
})
export class DataExplorerNavItems {}