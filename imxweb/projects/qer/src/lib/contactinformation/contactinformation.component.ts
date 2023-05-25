import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'imx-contactinformation',
  templateUrl: './contactinformation.component.html',
  styleUrls: ['./contactinformation.component.scss']
})
export class ContactinformationComponent implements OnInit {

  date_time: Date;
  temperature: number;
  wind_speed: number;

  employee: any[] = [];

  contactForm = this.formBuilder.group({
    name:'',
    email:'',
    message:''
  });


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.employeeAPI(); //Call the employee API

  }

  employeeAPI(){
    let headers = new HttpHeaders({});
    // Get data from the API database
    this.http.get<any>('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001', {headers: headers})
      .subscribe(employeedata => {
      this.employee = employeedata; // Passing the employeedata to the employee array
    });
  }

  SubmitForm(){
    const formData = this.contactForm.value;
    // Send (Post) the data from the input fields
    this.http.post('https://jsonplaceholder.typicode.com/posts', formData)
    .subscribe(
      response => {
        console.log('Data saved successfully', response);
        this.contactForm.reset();
      },
    error => {
      console.error('Error saving data', error);
    }
    );
  }
}
