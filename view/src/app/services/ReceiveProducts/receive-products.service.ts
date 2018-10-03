import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of, ObservableLike } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5000/API/Receive_Products/';
@Injectable({
  providedIn: 'root'
})
export class ReceiveProductsService {

  constructor(private http: Http) { }
  public ReceiveProducts_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Receive_Products_List', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public ReceiveProducts_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Receive_Products_View', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public ReceiveProducts_UpdateStock(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Receive_Products_UpdateStock', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
}
