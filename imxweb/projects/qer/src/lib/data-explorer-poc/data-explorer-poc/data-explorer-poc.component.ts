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

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SideNavigationExtension, SystemInfoService, HELP_CONTEXTUAL } from 'qbm';
import { UserModelService } from '../../user/user-model.service';
import { DataExplorerPocService } from '../data-explorer-poc.service';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
import { ProjectConfig } from 'imx-api-qbm';
import { QerProjectConfig } from 'imx-api-qer';

@Component({
  selector: 'ccc-data-explorer-poc',
  templateUrl: './data-explorer-poc.component.html',
  styleUrls: ['./data-explorer-poc.component.scss']
})
export class DataExplorerPocComponent implements OnInit {
  public isAdmin = false;
  public baseUrl = 'mydataexplorerpoc';
  public componentName = 'data-explorer-poc';
  public componentTitle = '#LDS#Heading Data Explorer POC';
  public contextId = HELP_CONTEXTUAL.MyResponsibilities;
  public navItems: SideNavigationExtension[] = [];
  constructor(
    private readonly systemInfoService: SystemInfoService,
    private readonly myDataExplorerPocService: DataExplorerPocService,
    private readonly userModelService: UserModelService,
    private cdref: ChangeDetectorRef,
    private readonly projectConfig: ProjectConfigurationService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadNavItems();
  }
  public async loadNavItems(): Promise<void> {
    const systemInfo = await this.systemInfoService.get();
    const features = (await this.userModelService.getFeatures()).Features || [];
    const userConfig = await this.userModelService.getUserConfig();
    const config: QerProjectConfig & ProjectConfig = await this.projectConfig.getConfig();
    this.navItems = this.myDataExplorerPocService
      .getNavItems(systemInfo.PreProps, features, config)
      .filter((elem) => elem.name === 'identities' || elem.name === 'devices' || userConfig.Ownerships.find(own => own.TableName === elem.name)?.Count > 0);
    this.cdref.detectChanges();
  }
}



