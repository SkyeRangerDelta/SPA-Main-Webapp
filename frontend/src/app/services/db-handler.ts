import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbHandler {

  private apiEndpoint = '/api/v1/';
  private noticesEndpoint = this.apiEndpoint + 'GetNotices';
  private recordsEndpoint = this.apiEndpoint + 'GetRecords';

  constructor ( private http: HttpClient ) {  }

  getNotices() {
    return this.http.get(this.noticesEndpoint);
  }

  getRecords() {
    return this.http.get(this.recordsEndpoint);
  }
}
