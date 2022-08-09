import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";
import * as buffer from "buffer";
import {Router} from "@angular/router";
@Component({
  selector: 'app-show-wallet',
  templateUrl: './show-wallet.component.html',
  styleUrls: ['./show-wallet.component.css']
})
export class ShowWalletComponent implements OnInit {

  wallets: Wallet[] = [];

  constructor(private walletService: WalletService,
              private router: Router) { }

  ngOnInit(): void {
    this.showWallet();
  }

  showWallet() {
    this.walletService.findAll().subscribe(wallets => {
      this.wallets = wallets;
    })
    this.router.navigate(['/wallet/' + localStorage.getItem('ID_WALLET')]).then();
  }
}
