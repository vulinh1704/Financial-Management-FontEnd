import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "money-types"
@Injectable({
  providedIn: 'root'
})
export class MoneyTypeService {

  constructor(private httpClient: HttpClient) {
  }
  showAll(): Observable<any> {
    return this.httpClient.get(API_URL);
  }
}
