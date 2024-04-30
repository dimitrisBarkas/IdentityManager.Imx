import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ccc-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  formDataList: any[] = [];
  currentFirstName: string = '';
  currentLastName: string = '';
  showTable = false;
  showPopup = false;

  ngOnInit(): void {
    this.loadFormData();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formDataList.push(form.value);
      this.currentFirstName = form.value.firstname;
      this.currentLastName = form.value.lastname;
      this.saveFormData();
      this.showTable = true;
      form.reset();
    }
  }

  handlePopupClose() {
    this.showPopup = false;
  }

  handleTableClose() {
    this.showPopup = true;
    this.showTable = false;
  }

  handleAddAnotherEntry() {
    this.showTable = false;
    this.showPopup = false;
  }

  private saveFormData() {
    sessionStorage.setItem('formData', JSON.stringify(this.formDataList));
  }

  private loadFormData() {
    const data = sessionStorage.getItem('formData');
    if (data) {
      this.formDataList = JSON.parse(data);
    }
  }
}
