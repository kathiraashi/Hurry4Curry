import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:3000/API/Inventory_Settings/';

@Injectable({
  providedIn: 'root'
})
export class InventorySettingsService {

  headers;
  constructor(private http: Http, private Service: LoginService) {
    this.headers = new Headers();
  }

  ValidateEveryRequest() {
    let Message = JSON.stringify({Status: false, Message: 'Your Login Expired! Please Login Again'});
    if (sessionStorage.getItem('Token') && sessionStorage.getItem('SessionKey') && sessionStorage.getItem('SessionToken') ) {
       const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
       const NowSession = new Date().getTime();
       const SessionDiff: number = NowSession - LastSession;
       const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
       if (SessionDiffMinutes >= 20 ) {
          Message = JSON.stringify({Status: false, Message: 'Your Session Expired! Please Login Again'});
          sessionStorage.clear();
       }
    }
    return Observable.create(observer => {
       const Response = {status: 401, _body: Message };
       observer.next(Response);
       observer.complete();
    });
 }

// ware House
 public Ware_House_AsyncValidate(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Ware_House_AsyncValidate', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public Ware_House_Create(Info: any): Observable<any[]> {
  if (this.Service.If_LoggedIn()) {
     this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
     sessionStorage.setItem('SessionKey', btoa(Date()));
     return this.http.post(API_URL + 'Ware_House_Create', Info, {headers: this.headers })
     .pipe( map(response => response),  catchError(error => of(error)));
  } else {
     return this.ValidateEveryRequest();
  }
  }
  public Ware_House_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'Ware_House_List', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public Ware_House_Simple_List(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'Ware_House_Simple_List', Info, {headers: this.headers })
        .pipe( map(response => response),  catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public Ware_House_Update(Info: any): Observable<any[]> {
     if (this.Service.If_LoggedIn()) {
        this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'Ware_House_Update', Info, {headers: this.headers })
        .pipe( map(response => response), catchError(error => of(error)));
     } else {
        return this.ValidateEveryRequest();
     }
  }
  public Ware_House_Delete(Info: any): Observable<any[]> {
    if (this.Service.If_LoggedIn()) {
      this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
      sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Ware_House_Delete', Info, {headers: this.headers })
    .pipe( map(response => response),  catchError(error => of(error)));
    } else {
    return this.ValidateEveryRequest();
    }
  }


}