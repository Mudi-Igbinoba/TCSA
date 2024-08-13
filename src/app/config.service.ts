import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tcsa } from './tcsa.object';
import { Transaction } from './transaction.object';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  url: string = 'https://json-server-vercel-one-lemon.vercel.app';

  constructor(private http: HttpClient) {}

  getAllTCSAs() {
    return this.http.get<[]>(this.url + '/tcsa');
  }

  getPaginatedTCSAs(page: number | string) {
    return this.http.get<Tcsa>(this.url + `/tcsa?_page=${page}&_limit=10`);
  }

  getTCSAByID(id: number | string) {
    return this.http.get<Tcsa>(this.url + `/tcsa/${id}`);
  }

  getAllTransactions(id: number | string) {
    return this.http.get<[]>(this.url + `/tcsa/${id}/transactions`);
  }

  getPaginatedTransactions(id: number | string, page: number | string) {
    return this.http.get<[]>(
      this.url + `/tcsa/${id}/transactions/?_page=${page}&_limit=5`
    );
  }

  deleteTCSA(id: number | string) {
    return this.http.delete<Tcsa>(this.url + `/tcsa/${id}`);
  }

  // postTCSA(data: any) {
  //   return this.http.post(this.url + '/tcsa', data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  // postTransactions(data: any) {
  //   return this.http.post(this.url + '/transactions', data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  // updateTCSA(id){
  //   return this.http.
  // }
}
