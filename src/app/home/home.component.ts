import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpen: boolean = true;
  transactions : Transaction[] = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.showTransaction();
  }

  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

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
    })
  }
}
