import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {WalletsService} from "../../service/wallets.service";
import {UserService} from "../../service/user.service";
import {Wallets} from "../../model/wallets";

@Component({
  selector: 'app-wallets-create',
  templateUrl: './wallets-create.component.html',
  styleUrls: ['./wallets-create.component.css']
})
export class WalletsCreateComponent implements OnInit {
  wallets: Wallets[] = [];
  listMoneyType: any ;
  walletsCreateForm = new FormGroup({
    icon: new FormControl(''),
    name: new FormControl(''),
    moneyAmount: new FormControl(''),
    status: new FormControl(''),
    moneyType: new FormControl(''),
  });

  obj: any
  id: any

  constructor(private httpClient: HttpClient,
              private router: Router,
              private walletsService: WalletsService,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  addWallet() {
    console.log(this.walletsCreateForm.value)
    this.obj = {
      name: this.walletsCreateForm.value.name,
      icon: this.walletsCreateForm.value.icon,
      moneyAmount: this.walletsCreateForm.value.moneyAmount,
      status: this.walletsCreateForm.value.status,
      moneyType: {
        id: this.walletsCreateForm.value.moneyType
      },
      user: {
        id: localStorage.getItem('ID'),
      }
    }
    console.log(this.wallets)
    this.walletsService.save(this.obj).subscribe((data) => {
      alert("add successfully");
      this.obj = data;
      this.router.navigate(['/user/list'])
    }, error => {
      console.log(error)
    })
  }

}
