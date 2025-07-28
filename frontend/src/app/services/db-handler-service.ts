import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbHandlerService {

  private apiEndpoint = '/api/v1/';
  private noticesEndpoint = this.apiEndpoint + 'GetNotices';
  private recordsEndpoint = this.apiEndpoint + 'GetRecords';

  constructor ( private http: HttpClient ) {  }

  getNotices( limit?: number ) {
    return this.http.get(
      `${this.noticesEndpoint}?limit=${limit || 5}`,
    ).pipe(
      map( (data: any) => {
        if ( !data || !Array.isArray(data) ) {
          return [];
        }

        // Assuming the data is an array of notices
        return data.map((notice: any) => {
          return {
            id: notice.id,
            title: notice.title,
            content: notice.content,
            date: new Date(notice.date)
          };
        });
      } ),
      catchError( ( e: unknown ) => {
        console.error('Error fetching notices:', e);
        return [];
      } )
    );
  }

  getRecords() {
    return this.http.get(this.recordsEndpoint);
  }
}
