import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";

const ID = localStorage.getItem('ID')
const API_TRAN = environment.apiUrl + "transactions"
@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  constructor(private httpClient:HttpClient) { }

  showAllTransaction():Observable<Transaction[]>{
    // @ts-ignore
    return this.httpClient.get(API_TRAN)
  }

  findAllByTransactionId(id: string | any): Observable<Transaction[]> {
    // @ts-ignore
    return this.httpClient.get<Transaction>(API_TRAN + '/id=' + id)
  }

  saveTransaction(transaction:Transaction):Observable<Transaction>{
    return this.httpClient.post<Transaction>(API_TRAN ,transaction )
  }

  editTransaction(id:any,transaction:Transaction):Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${API_TRAN}/${id}`, transaction)
  }

  deleteTransaction(id:any): Observable<Transaction>{
    return this.httpClient.delete<Transaction>(API_TRAN+ `${id}`)
  }

  showAllByCategory(id:any):Observable<Transaction[]>{
    // @ts-ignore
    return this.httpClient.get<Transaction>(API_TRAN + `/category-spending?id=`+id)
  }

  showAllByWallet(id:any):Observable<Transaction[]>{
    // @ts-ignore
    return this.httpClient.get<Transaction>(API_TRAN + `/wallet?id=`+id)
  }

  showAllByUserId(id:any): Observable<Transaction[]>{
    // @ts-ignore
    return this.httpClient.get(API_TRAN + `/find-all-by-userId?id=`+ID);
  }



}
