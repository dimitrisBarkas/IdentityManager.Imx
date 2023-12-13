/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, Routes } from '@angular/router';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { ClassloggerService, MenuService, RouteGuardService, SideNavigationViewModule } from 'qbm';
import { ApplicationGuardService } from '../guards/application-guard.service';
import { DataExplorerPocComponent } from './data-explorer-poc/data-explorer-poc.component';
import { DataExplorerPocService } from './data-explorer-poc.service';

const routes: Routes = [
  {
    path: 'mydataexplorerpoc',
    component: DataExplorerPocComponent,
    canActivate: [RouteGuardService, ApplicationGuardService],
    resolve: [RouteGuardService],
  },
  {
    path: 'mydataexplorerpoc/:tab',
    component: DataExplorerPocComponent,
    canActivate: [RouteGuardService, ApplicationGuardService],
    resolve: [RouteGuardService],
  },
];

@NgModule({
  declarations: [DataExplorerPocComponent],
  imports: [CommonModule, EuiCoreModule, EuiMaterialModule, MatTooltipModule, TranslateModule, SideNavigationViewModule],
  providers: [DataExplorerPocService],
  exports: [DataExplorerPocComponent]
})
export class DataExplorerPocModule {
  constructor(readonly router: Router, private readonly menuService: MenuService, logger: ClassloggerService) {
    const config = router.config;
    routes.forEach((route) => {
      config.splice(config.length - 1, 0, route);
    });
    this.router.resetConfig(config);
    logger.info(this, '▶️ MyResponsibilitiesViewModule loaded');
    this.setupMenu();
  }

  private setupMenu(): void {
    this.menuService.addMenuFactories((preProps: string[], features: string[]) => ({
      id: 'ROOT_DataExplorerPoc',
      title: '#LDS#DataExplorerPoc',
      sorting: '30',
      items: [
        {
          id: 'QER_My_DataExplorerPoc',
          navigationCommands: { commands: ['mydataexplorerpoc'] },
          title: '#LDS#Menu Entry mydataexplorerpoc',
          sorting: '30-20',
        },
      ],
    }));
  }
}
