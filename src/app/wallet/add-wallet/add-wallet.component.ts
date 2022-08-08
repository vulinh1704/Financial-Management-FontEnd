import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WalletService} from "../../service/wallet.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent implements OnInit {

  walletForm = new FormGroup({
    name: new FormControl(),
    moneyType: new FormControl(),
  });
  icon: any;
  wallet: any;

  constructor(private walletService: WalletService,
              private router: Router,
              private toast : NgToastService) { }

  ngOnInit(): void {
    this.icon = "https://static.moneylover.me/img/icon/icon_32.png"
  }

  changeIcon(event: any) {
    this.icon = event.target.src;
  }

  addWallet() {
    this.wallet = {
      name: this.walletForm.value.name,
      moneyType: {
        id: this.walletForm.value.moneyType,
      },
      icon: this.icon,
      moneyAmount: 0,
      status: 1,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.wallet);
    this.walletService.save(this.wallet).subscribe(() => {
      this.toast.success({detail:"Thông báo", summary: "Thêm ví thành công!",duration: 3000,position:'toast-bottom-right'})
      this.router.navigate(['/wallet']).then();
    }, error => {
      this.toast.error({detail:"Thông báo", summary: "Thêm ví thất bại!",duration: 3000,position:'toast-bottom-right'})
    })
    location.reload()
  }
}
