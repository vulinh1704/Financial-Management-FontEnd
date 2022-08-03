import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Wallets} from "../model/wallets";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + 'wallets';
const ID = localStorage.getItem('ID');

@Injectable({
  providedIn: 'root'
})
export class WalletsService {


  constructor(private httpClient: HttpClient) {
  }

  findAllByStatusPublic(): Observable<any> {
    return this.httpClient.get(API_URL + `?id=` + ID)
  }

  findAllByStatusPrivate(): Observable<any> {
    return this.httpClient.get(API_URL + `/history/` + ID)
  }

  save(wallets: Wallets): Observable<Wallets> {
    // @ts-ignore
    return this.httpClient.post(API_URL, wallets)
  }

  getById(id: any): Observable<Wallets> {
    return this.httpClient.get<Wallets>(API_URL + `/${id}`);
  }

  edit(id: number, wallets: Wallets): Observable<Wallets> {
    return this.httpClient.put<Wallets>(`${API_URL}/${id}`, wallets);
  }

  delete(id: number): Observable<Wallets> {
    return this.httpClient.delete<Wallets>(API_URL + `/${id}`);
  }

}
