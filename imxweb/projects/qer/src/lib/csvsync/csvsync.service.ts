import { Injectable } from '@angular/core';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';

export interface PreActionElement{
  message: string;
  permission: boolean;
}

export interface ValidationElement{
  rowIndex: number;
  colIndex: number;
  message: string;
}

export interface PeriodicElement {
  permission: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CsvsyncService {

  constructor() { }
  
  public startValidateMethod(endpoint: string, startobject: any): MethodDescriptor<PreActionElement> {
    return {
      path: `/portal/bulkactions/${endpoint}/startvalidate`,
      parameters: [
        {
          name: 'startobject',
          value: startobject,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }
  
  public startImportMethod(endpoint: string, startobject: any): MethodDescriptor<PreActionElement> {
    return {
      path: `/portal/bulkactions/${endpoint}/startimport`,
      parameters: [
        {
          name: 'startobject',
          value: startobject,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }
  
  public endImportMethod(endpoint: string, startobject: any): MethodDescriptor<PreActionElement> {
    return {
      path: `/portal/bulkactions/${endpoint}/endimport`,
      parameters: [
        {
          name: 'startobject',
          value: startobject,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }

  public getConfigCsv(): MethodDescriptor<object> {
    const parameters = [];
    return {
      path: `/portal/ConfigCsv`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  public getMapping(endpoint: string): MethodDescriptor<object> {
    const parameters = [];
    return {
      path: `/portal/bulkactions/${endpoint}/mapping`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  public notebook(endpoint: string): MethodDescriptor<object> {
    const parameters = [];
    return {
      path: `/portal/bulkactions/${endpoint}/noduplicates`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  public validateRow(endpoint: string, rowToValidate: any): MethodDescriptor<ValidationElement> {
    return {
      path: `/portal/bulkactions/${endpoint}/validate`,
      parameters: [
        {
          name: 'rowToValidate',
          value: rowToValidate,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }

  public getWhoForCSV(): MethodDescriptor<void> {
    const parameters = [];
    return {
      path: `/portal/BulkActionsFunctionsForUser`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

  public PostObject(endpoint: string, inputParameterName: any): MethodDescriptor<PeriodicElement> {
    return {
      path: `/portal/bulkactions/${endpoint}/import`,
      parameters: [
        {
          name: 'inputParameterName',
          value: inputParameterName,
          in: 'body'
        },
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }
}