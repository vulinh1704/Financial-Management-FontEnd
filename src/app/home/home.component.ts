import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  value: number = 0;
  highValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 1000
  };

}
