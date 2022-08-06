import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API = 'http://localhost:8080/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any> {
    return this.httpClient.get(API + '/find-by-wallet/' + localStorage.getItem('ID_WALLET'));
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + '/' + id);
  }

  save(transaction: any): Observable<any> {
    return this.httpClient.post(API, transaction);
  }

  update(id: number, transaction: any): Observable<any> {
    return this.httpClient.put(API + `/${id}`, transaction);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(API + `/${id}`);
  }
}
