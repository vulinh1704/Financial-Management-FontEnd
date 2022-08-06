import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  arr: any[] = [20, 60, 20, 30 , 40, 50, 48,57];

  ngOnInit(): void {
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow',
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: this.arr,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            '#e66465'
          ],
          hoverOffset: 4
        }]
      },
    });


    const ctx2 = document.getElementById('myChart2');
    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        // datasets: [{
        //   label: '# of Votes',
        //   data: [12, 19, 3, 5, 2, 3],
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)'
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)'
        // ],
        // borderWidth: 1
        datasets: [{
          label: 'Data1',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth:1
        },
          {
            label: 'Data1',
            data: [6, 21, 3, 5, 2, 3],
            backgroundColor: 'rgb(60,56,159)',
            borderColor: 'rgb(138,30,53)',
            borderWidth:1
          }
        ],
  },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

);
}

value: number = 0;
highValue: number = 0;
options: Options = {
  floor: 0,
  ceil: 1000,
};

}
