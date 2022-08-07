import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";
import {Chart, registerables} from "chart.js";
import {ExportService} from "../service/export.service";

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen: boolean = true;
  transactions: Transaction[] = [];
  arr: any[] = [20, 60, 20, 30, 40, 50, 48, 57];

  //ranger
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor(private transactionService: TransactionService,
              private exportService: ExportService) {

  }

  ngOnInit(): void {
    this.showTransaction();
    this.chart3();
    this.chart();
    this.chart2();
  }

  isOpenHtml() {
    // @ts-ignore
    if (document.getElementById('detail').hidden) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  showTransaction() {
    this.transactionService.findAll().subscribe(transactions => {
      this.transactions = transactions;
      console.log(transactions);
      this.transactionList();
    })
  }

  // chart
  chart3() {
    const ctx = document.getElementById('myChart3');
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
  }

  chart() {
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
  }

  chart2() {
    const ctx2 = document.getElementById('myChart2');
    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Data1',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          },
            {
              label: 'Data1',
              data: [6, 21, 3, 5, 2, 3],
              backgroundColor: 'rgb(60,56,159)',
              borderColor: 'rgb(138,30,53)',
              borderWidth: 1
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


  // exportFile
  transactionFile: any[] = [];
  transactionList(){
    for (let i = 0; i < this.transactions.length; i++) {
      this.transactionFile.push({'Số thứ tự': `${i + 1}`, 'Loại chi tiêu': `${this.transactions[i].category.status}`,
        'Tổng tiền': `${this.transactions[i].totalSpent}`, 'Thời gian': `${this.transactions[i].time}`, 'Ghi chú': `${this.transactions[i].note}`})
    }
    console.log('transaction',this.transactionFile)
  }
  export() {
    alert(1)
    this.exportService.exportExcel(this.transactionFile, 'transactions');
  }
}
