import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap, map, catchError } from 'rxjs/operators';
import { DayTable } from './daytable.model';
import { throwError } from 'rxjs/internal/observable/throwError';

const API_URL = 'https://api.numerolog-valeria.ru/daytable';
const YOUR_USERNAME = 'admin';
const YOUR_PASSWORD = 'admin123';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(YOUR_USERNAME + ':' + YOUR_PASSWORD)))
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DayTableService {
  constructor(private http: HttpClient) {}

  getDayTables(): Observable<DayTable[]> {
    return this.http.get<DayTable[]>(API_URL).pipe(
      tap(res => console.log('getDayTables completed')),
      catchError(this.handleError('getDayTables', []))
    );
  }

  updateDayTable(id: number, dayTable: DayTable): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.put(url, dayTable, httpOptions).pipe(
      tap(res => console.log(`updateDayTable by id = ${id}`)),
      catchError(this.handleError<any>('updateDayTable'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation, error);
      if (error.error.text === 'You Dont access') { return throwError(error.error.text); }
      return of(result as T);
    };
  }

}
