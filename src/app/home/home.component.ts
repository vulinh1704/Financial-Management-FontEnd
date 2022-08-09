import {Component, Input, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";
import {Chart, registerables} from "chart.js";
import {ExportService} from "../service/export.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen: boolean = true;
  transactions: Transaction[] = [];
  idWallet: any;

  //ranger
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor(private transactionService: TransactionService,
              private exportService: ExportService,
              private router: Router,
              private toast: NgToastService) {
    this.idWallet = localStorage.getItem("ID_WALLET");
  }

  ngOnInit(): void {
    setTimeout(()=> {
      // @ts-ignore
      document.getElementById("defaultOpen").click();
    },700)
    this.showTransaction();
    this.chart();
    this.chart2();
    this.chart3();

  }

  isOpenHtml(id: any) {
    // @ts-ignore
    if (document.getElementById('' + id).hidden) {
      // @ts-ignore
      document.getElementById('' + id).hidden = false;
    } else {
      // @ts-ignore
      document.getElementById('' + id).hidden = true;
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
  labelsSpent: any[] = ['Trống'];
  colorSpent: any[] = ['#d0e1ef'];
  totalRevenueSpent = 0;
  percentMoneySpent: any[] = [100];
  checkIdSpent: any[] = [];
  totalSpent: any[] = [];

  getDataSpent() {
    let pm = 0;
    this.transactionService.findAllByMonth(2).subscribe((transactions) => {
      this.transactionsSpent = transactions;
      if (this.transactionsSpent.length != 0) {
        this.labelsSpent.pop();
        this.colorSpent.shift();
        this.percentMoneySpent.pop();
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

  chart3() {
    this.getDataSpent();
    const ctx = document.getElementById('myChart3');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labelsSpent,
        datasets: [{
          label: 'My First Dataset',
          data: this.percentMoneySpent,
          backgroundColor: this.colorSpent,
          hoverOffset: 4
        }]
      },
    });
  }


  //biểu đồ thu
  transactionsCollect: any[] = [];
  labelsCollect: any[] = ['Trống'];
  colorCollect: any[] = ['#d0e1ef'];
  totalRevenueCollect = 0;
  percentMoney: any[] = [100];
  checkIdCollect: any[] = [];
  totalCollect: any[] = [];


  getDataCollect() {
    let pm = 0;
    this.transactionService.findAllByMonth(1).subscribe((transactions) => {
      this.transactionsCollect = transactions;
      if (this.transactionsCollect.length != 0) {
        this.labelsCollect.pop();
        this.colorCollect.pop();
        this.percentMoney.pop();
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


  //biểu đồ 6 tháng gần nhất
  getData6Month() {
    let today = new Date();
    let date = today.getMonth() + 1;
    console.log('date',date);
  }
  chart2() {
    this.getData6Month();
    const ctx2 = document.getElementById('myChart2');
    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Thu', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Thu',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          },
            {
              label: 'Chi',
              data: [6, 21, 3, 5, 2, 3],
              backgroundColor: 'rgb(60,56,159)',
              borderColor: 'rgb(150,33,58)',
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
  categoryStatus: any;
  totalFile: any;

  transactionList() {
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].category.status == '1') {
        this.categoryStatus = 'Thu';
      } else if (this.transactionsSpent[i].category.status == '2') {
        this.categoryStatus = 'Chi';
      }
      this.transactionFile.push({
        'Số thứ tự': `${i + 1}`,
        'Danh mục chi tiêu': `${this.categoryStatus}`,
        'Tên danh mục chi tiêu': `${this.transactions[i].category.name}`,
        'Tổng tiền': `${this.transactions[i].totalSpent + ' ' + this.transactions[i].wallet.moneyType.name}`,
        'Thời gian': `${this.transactions[i].time}`,
        'Ghi chú': `${this.transactions[i].note}`
      })
    }
  }

  export() {
    let timerInterval: any;
    Swal.fire({
      title: '<h3 style="color: #5ec05e"><img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340" style="width: 100px;height: 100px"><\h3>',
      html: 'Các giao dịch tải trong <b></b> mili giây',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        // @ts-ignore
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          // @ts-ignore
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval);
        this.exportService.exportExcel(this.transactionFile, 'transactions');
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  confirmDelete(id: number) {
      let timerInterval: any;
      Swal.fire({
        title: '<h3 style="color: #5ec05e"><img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340" style="width: 100px;height: 100px"><\h3>',
        html: 'Giao dịch sẽ được xóa trong <b></b> mili giây',
        timer: 2850,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          // @ts-ignore
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            // @ts-ignore
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        this.transactionService.delete(id).subscribe(() => {
          this.toast.success({detail:"Thông báo", summary: "Xóa giao dich thành công!",duration: 3000,position:'br'})
          setInterval(() => {
            location.reload()
          }, 600)
        })
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })
  }

  //get idTransaction
  idEdit: number = 22;

  //Paging
  p: number = 1;
  total: number = 0;

  pageChangeEvent(event: number) {
    this.p = event;
  }

}
