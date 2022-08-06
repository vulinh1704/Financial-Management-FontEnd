import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../model/wallet";
import {Category} from "../model/category";
const API_CA = environment.apiUrl + "categories-spending"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  showAllCate():Observable<Wallet[]>{
    // @ts-ignore
    return this.httpClient.get(API_CA)
  }
  saveCategogry(): Observable<Category>{
    // @ts-ignore
    return this.httpClient.post(API_CA)
  }
}
