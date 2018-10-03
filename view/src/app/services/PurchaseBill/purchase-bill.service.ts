import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of, ObservableLike } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5000/API/FranchiseePurchaseBill/';

@Injectable({
  providedIn: 'root'
})
export class PurchaseBillService {

  constructor(private http: Http) { }
  public PurchaseRequest_RefNo_AsyncValidate(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PurchaseRequest_RefNo_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public PurchaseBill_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseBill_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseBill_List', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseBill_View', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_Received(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'FranchiseePurchaseBill_Received', Info).pipe( map(response => response),  catchError(error => of(error)));
}
public PurchaseBill_YieldUpdate_List(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'FranchiseePurchaseBill_YieldUpdate_List', Info).pipe( map(response => response),  catchError(error => of(error)));
}
public PurchaseBill_Yield_Update(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'FranchiseePurchaseBill_Yield_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
}
}
