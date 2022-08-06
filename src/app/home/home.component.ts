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
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  openHtml(event: any) {
    // @ts-ignore
    document.getElementById('detail').innerHTML =
      `               <th scope="row" style="color: red">
                        <i class="fa-solid fa-x"></i>
                      </th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="color: green" >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </td>
                      <td>
                        <a (click)="closeHtml()"><i class="fa-solid fa-angle-up"></i></a>
                      </td>
                      `;
  }
  closeHtml() {
    // @ts-ignore
    document.getElementById('detail').innerHTML = ``;
  }

}
