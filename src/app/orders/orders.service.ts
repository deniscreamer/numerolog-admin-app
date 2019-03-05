import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap, map, catchError } from 'rxjs/operators';
import { Order } from './orders.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const API_URL = 'https://api.numerolog-valeria.ru/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {


  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL).pipe(
      tap(res => console.log('getted orders')),
      catchError(this.handleError('getOrders', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
