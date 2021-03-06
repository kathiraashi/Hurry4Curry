import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of, ObservableLike } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5000/API/Purchase_Request/';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  constructor(private http: Http) { }
  public PurchaseRequest_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Purchase_Request_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public PurchaseRequest_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Purchase_Request_List', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public PurchaseRequest_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Purchase_Request_View', Info).pipe(map(response => response), catchError(error => of(error)));
  }
  public PurchaseRequest_Update(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Purchase_Request_Update', Info).pipe(map(response => response), catchError(error => of(error)));
  }
}
