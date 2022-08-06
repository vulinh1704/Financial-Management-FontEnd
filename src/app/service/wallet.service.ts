import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
import {Wallet} from "../model/wallet";
// const ID = localStorage.getItem('ID')
const API_WA = environment.apiUrl + "wallets"
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient:HttpClient) { }

  showAllWallet():Observable<Wallet[]>{
    // @ts-ignore
    return this.httpClient.get(API_WA)
  }
}
