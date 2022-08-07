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

  //ranger
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor(private transactionService: TransactionService, private exportService: ExportService) {
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
      this.transactionList();
    })
  }

  // biểu đồ chi
  transactionsSpent: any[] = [];
  labelsSpent: any = [];
  colorSpent: any[] = [];
  totalRevenueSpent = 0;
  percentMoneySpent: any[] = [];
  checkIdSpent: any[] = [];
  totalSpent: any[] = [];

  getDataSpent() {
    let pm = 0;
    this.transactionService.findAllByMonth(2).subscribe((transactions) => {
      this.transactionsSpent = transactions;
      if (this.transactionsSpent.length == 0) {
        this.labelsSpent.push("trống");
        this.colorSpent.push('#d0e1ef');
        this.percentMoneySpent.push(100);
      }
      if(this.transactionsSpent.length != 0){
        alert(1)
        for (let i = 0; i < this.transactionsSpent.length; i++) {
          if (!this.checkIdSpent.includes(this.transactionsSpent[i].category.id)) {
            this.labelsSpent.push(this.transactionsSpent[i].category.name);
            this.colorSpent.push(this.transactionsSpent[i].category.color);
            this.checkIdSpent.push(this.transactionsSpent[i].category.id);
            this.totalSpent.push(this.transactionsSpent[i].totalSpent);
          } else {
            for (let j = 0; j < this.checkIdSpent.length; j++) {
              if (this.checkIdSpent[j] == this.transactionsSpent[i].category.id) {
                this.totalSpent[j] += this.transactionsSpent[i].totalSpent;
              }
            }
          }
          this.totalRevenueSpent += this.transactionsSpent[i].totalSpent;
        }
        for (let i = 0; i < this.totalSpent.length; i++) {
          pm = (this.totalSpent[i] / this.totalRevenueSpent) * 100;
          this.percentMoneySpent.push(pm);
        }
      }
    });
  }

  lab:any = []
  chart3() {
    this.getDataSpent();
    console.log('lable =>',this.labelsSpent)
    this.lab.push('trống');
    console.log('lab', this.lab)
    if(this.lab == this.labelsSpent){
      alert(1);
    }
    const ctx = document.getElementById('myChart3');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.lab,
        datasets: [{
          label: 'My First Dataset',
          data: [
            100
          ],
          backgroundColor: [
            '#d0e1ef'
          ],
          hoverOffset: 4
        }]
      },
    });
  }


  //biểu đồ thu
  transactionsCollect: any[] = [];
  labelsCollect: any[] = [];
  colorCollect: any[] = [];
  totalRevenueCollect = 0;
  percentMoney: any[] = [];
  checkIdCollect: any[] = [];
  totalCollect: any[] = [];
  arr: any[] = [20, 60, 20, 30, 40, 50, 48, 57];
  getDataCollect() {
    let pm = 0;
    this.transactionService.findAllByMonth(1).subscribe((transactions) => {
      this.transactionsCollect = transactions;
      for (let i = 0; i < this.transactionsCollect.length; i++) {
        if (!this.checkIdCollect.includes(this.transactionsCollect[i].category.id)) {
          this.labelsCollect.push(this.transactionsCollect[i].category.name);
          this.colorCollect.push(this.transactionsCollect[i].category.color);
          this.checkIdCollect.push(this.transactionsCollect[i].category.id);
          this.totalCollect.push(this.transactionsCollect[i].totalSpent);
        } else {
          for (let j = 0; j < this.checkIdCollect.length; j++) {
            if (this.checkIdCollect[j] == this.transactionsCollect[i].category.id) {
              this.totalCollect[j] += this.transactionsCollect[i].totalSpent;
            }
          }
        }
        this.totalRevenueCollect += this.transactionsCollect[i].totalSpent;
      }
      for (let i = 0; i < this.totalCollect.length; i++) {
        pm = (this.totalCollect[i] / this.totalRevenueCollect) * 100;
        this.percentMoney.push(pm);
      }
    });
  }

  chart() {
    this.getDataCollect();
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labelsCollect,
        datasets: [{
          label: 'My First Dataset',
          data: this.percentMoney,
          backgroundColor: this.colorCollect,
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

  transactionList() {
    for (let i = 0; i < this.transactions.length; i++) {
      this.transactionFile.push({
        'Số thứ tự': `${i + 1}`,
        'Loại chi tiêu': `${this.transactions[i].category.status}`,
        'Tổng tiền': `${this.transactions[i].totalSpent}`,
        'Thời gian': `${this.transactions[i].time}`,
        'Ghi chú': `${this.transactions[i].note}`
      })
    }
  }

  export() {
    alert(1)
    this.exportService.exportExcel(this.transactionFile, 'transactions');
  }
}
