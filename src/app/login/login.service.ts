import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }
  backOfficeLogin(data:any){
  	return this.http.post<any>('/api/news/backOfficeLogin',data)
  }

}
