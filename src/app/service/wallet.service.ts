import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API = 'http://localhost:8080/wallets'

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any> {
    return this.httpClient.get(API);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + '/' + id);
  }

  save(wallet: any): Observable<any> {
    return this.httpClient.post(API, wallet);
  }

  update(id: number, wallet: any): Observable<any> {
    return this.httpClient.put(API + `/${id}`, wallet);
  }

  delete(id: number, wallet: any): Observable<any> {
    return this.httpClient.put(API + '/delete' + id, wallet);
  }
}
