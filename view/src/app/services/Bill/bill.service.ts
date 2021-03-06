import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5000/API/CustomerBill/';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: Http) { }

  public Bill_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'CustomerBill_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public Bill_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'CustomerBill_List', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
}

