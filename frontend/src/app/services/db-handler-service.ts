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
  constructor ( private http: HttpClient ) {  }

  getNotices( limit?: number, offset?: number ) {
    const params = [];
    if ( limit !== undefined ) params.push( `limit=${limit}` );
    if ( offset !== undefined ) params.push( `offset=${offset}` );
    const query = params.length ? `?${params.join('&')}` : '';
    return this.http.get(
      `${this.noticesEndpoint}${query}`,
    ).pipe(
      map( (data: any) => {
        if ( data && Array.isArray(data.notices) ) {
          return data.notices;
        }

        if ( Array.isArray(data) ) {
          return data;
        }
        return [];
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
}
