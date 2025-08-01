import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Department, NoticeRes } from '../TypeDefs';

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

  getNoticeById(id: number): Observable<NoticeRes> {
    return this.http.get(`${this.noticesEndpoint}?id=${id}`).pipe(
      map((data: any) => {
        return {
          status: data.status,
          message: data.message,
          success: data.success,
          notice: data.notice || null
        } as NoticeRes;
      }),
      catchError(( e: any ) => {
        console.error('Error fetching notice by id:', e);

        if ( e.status === 500 ) {
          return of({
            status: 500,
            message: 'Error fetching notice',
            success: false,
            notice: null
          } as NoticeRes
          );
        }

        return of(
          {
            status: e.status || 500,
            message: e.message || 'Unknown error occurred',
            success: false,
            notice: null
          } as NoticeRes
        );
      })
    );
  }

  getDepartments() {
    return this.http.get(`${this.apiEndpoint}GetDepartments`).pipe(
      map((data: any) => {
        return data.departments;
      }),
      catchError((e: any) => {
        console.error('Error fetching departments:', e);
        return of([] as Department[]); // Return an empty array on error
      }
    ));
  }

  getRecords() {
    return this.http.get(this.recordsEndpoint);
  }
}
