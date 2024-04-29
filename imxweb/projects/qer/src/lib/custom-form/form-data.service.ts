import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formDataList: any[] = [];
  constructor() { }
}