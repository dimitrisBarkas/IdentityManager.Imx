import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'imx-contactinformation',
  templateUrl: './contactinformation.component.html',
  styleUrls: ['./contactinformation.component.scss']
})
export class ContactinformationComponent implements OnInit {

  date_time: Date;
  temperature: number;
  wind_speed: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let headers = new HttpHeaders({});
    this.http.get<any>('https://api.open-meteo.com/v1/forecast?latitude=37.98376&longitude=23.72784&current_weather=true&hourly=temperature_2m,windspeed_10m', {headers: headers}).subscribe(data => { 
      this.date_time = data.current_weather.time;
      this.temperature = data.current_weather.temperature;
      this.wind_speed = data.current_weather.windspeed;
      console.log(data);});
  }
}
