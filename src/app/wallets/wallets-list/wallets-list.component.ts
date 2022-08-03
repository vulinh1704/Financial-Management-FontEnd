import {Component, OnInit} from '@angular/core';
import {Wallets} from "../../model/wallets";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {WalletsService} from "../../service/wallets.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.css']
})
export class WalletsListComponent implements OnInit {
  wallets: Wallets[] = [];
  username = localStorage.getItem('USERNAME');

  constructor(private httpClient: HttpClient,
              private router: Router,
              private walletsService: WalletsService,) {
  }

  ngOnInit(): void {
    this.getAllWalletByUser();
  }

  getAllWalletByUser(){
    this.walletsService.findAllByStatusPublic().subscribe(data=>{
      this.wallets = data
    },error => {
      console.log(error)
    })
  }

  delete(id: any) {
    this.walletsService.delete(id).subscribe(()=>{
      alert("ok");
      this.getAllWalletByUser();
    },error => {
      console.log(error);
    })
  }

}
