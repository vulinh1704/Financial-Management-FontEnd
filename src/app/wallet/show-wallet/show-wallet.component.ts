import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";
@Component({
  selector: 'app-show-wallet',
  templateUrl: './show-wallet.component.html',
  styleUrls: ['./show-wallet.component.css']
})
export class ShowWalletComponent implements OnInit {

  wallets: Wallet[] = [];

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.showWallet();
  }

  showWallet() {
    this.walletService.findAll().subscribe(wallets => {
      this.wallets = wallets;
    })
  }


}
