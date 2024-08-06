import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tcsa } from './tcsa.object';
import { Transaction } from './transaction.object';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllTCSAs(page: number | string) {
    return this.http.get<Tcsa>(this.url + `/tcsa/?_page=${page}&_per_page=10`);
  }

  getTCSAByID(id: number | string) {
    return this.http.get<Tcsa>(this.url + `/tcsa/${id}`);
  }

  getTransactionByID(id: number | string, page: number | string) {
    return this.http.get(
      this.url + `/transactions?tcsaid=${id}&_page=${page}&_per_page=5`
    );
  }

  deleteTCSA(id: number | string) {
    return this.http.delete<Tcsa>(this.url + `/tcsa/${id}`);
  }

  postTCSA(data: any) {
    return this.http.post(this.url + '/tcsa/', data);
  }

  // updateTCSA(id){
  //   return this.http.
  // }
}
