import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {HttpClient} from "@angular/common/http";

const   API_CA = 'http://localhost:8080/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  findAll(): Observable<Category[]>{
    // @ts-ignore
    return this.httpClient.get(API_CA)
  }

  save(category:Category): Observable<any> {
    return this.httpClient.post(API_CA,category)
  }

  getById(id: any): Observable<Category> {
    return this.httpClient.get<Category>(API_CA + `/${id}`);
  }

  edit(id: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${API_CA}/${id}`, category);
  }
  delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(API_CA + `/${id}`);
  }


  constructor(private httpClient: HttpClient) { }
}
