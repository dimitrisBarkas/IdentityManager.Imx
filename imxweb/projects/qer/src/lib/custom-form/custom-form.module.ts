import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem, ClassloggerService, RouteGuardService } from 'qbm';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CustomFormComponent } from './custom-form.component';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { CustomTableComponent } from './custom-table/custom-table.component';

const routes: Routes = [
  {
    path: 'custom-form',
    component: CustomFormComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService],
  },
];

@NgModule({
  declarations: [CustomFormComponent, CustomPopupComponent, CustomTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
  ],
})
export class CustomFormModule {
  constructor(private readonly menuService: MenuService, private readonly logger: ClassloggerService) {
    this.logger.info(this, '▶️ Custom Form Module loaded');
    this.setupMenu();
  }

  /** This method defines the menu structure for the portal. */
  private setupMenu(): void {
    this.menuService.addMenuFactories((preProps: string[], features: string[]) => {
      const menu: MenuItem = {
        id: 'ROOT_CustomForm',
        title: '#LDS#Custom form',
        sorting: '70',
        route: routes[0].path,
      };
      return menu;
    });
  }
}
