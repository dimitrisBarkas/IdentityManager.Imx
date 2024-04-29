import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { FormDataService } from './form-data.service';

@Component({
  selector: 'ccc-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  showTable: boolean = false;
  popup: boolean = false; // This controls popup visibility
  currentFirstName: string = '';
  currentLastName: string = '';

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formDataService.formDataList.push(form.value);
      this.currentFirstName = form.value.firstname;
      this.currentLastName = form.value.lastname;
      this.showTable = true; // Show table after submitting form
      this.popup = false; // Ensure popup does not show yet
      form.reset();
    }
  }

  showPopup() {
    this.popup = true; // Set this to true when OK button is clicked in the table component
  }

  closePopup() {
    this.popup = false; // Hide the popup when closed
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.showTable = false;
    this.popup = false;
  }
}
