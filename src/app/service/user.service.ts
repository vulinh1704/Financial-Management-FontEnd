import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

const API_URL = environment.apiUrl + "users"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  showAllUser() :Observable<any> {
    return this.httpClient.get(API_URL)
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>( environment.apiUrl + 'register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + '/login', user);
  }



}
