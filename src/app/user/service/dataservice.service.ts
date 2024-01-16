import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  baseUrl: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }



  getUsers(endpoint: string) {
    let url = this.baseUrl + endpoint
    return this.http.get(url);
  }

  postUser(endpoint: string, userObj: any) {
    let url = this.baseUrl + endpoint
    return this.http.post(url, userObj);
  }

  deleteUser(endpoint: string, userId: number) {
    const url = this.baseUrl + endpoint;
    return this.http.delete(url);
  }

  editUserDetails(endpoint : string,userObj : any){
    const url = this.baseUrl + endpoint;
    return this.http.put(url, userObj)
  }
}
