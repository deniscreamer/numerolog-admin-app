import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap, map, catchError } from 'rxjs/operators';
import { Order } from './orders.model';
import { Subject } from 'rxjs';

const API_URL = 'https://api.numerolog-valeria.ru/orders';
const YOUR_USERNAME = 'admin';
const YOUR_PASSWORD = 'admin123';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      btoa(unescape(encodeURIComponent(YOUR_USERNAME + ':' + YOUR_PASSWORD))),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public deleteOrderEmitter: Subject<number> = new Subject();
  public selectedOrder: any;

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<any[]>(API_URL, httpOptions).pipe(
      tap(() => console.log('getted orders')),
      catchError(this.handleError('getOrders', []))
    );
  }

  public deleteOrder(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(() => console.log(`delete from orders by id = ${id}`)),
      catchError(this.handleError('deleteOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

  /* functional for Orders with EventEmitter (remove, change) */
  public getEmitterDeleteOrder() {
    return this.deleteOrderEmitter;
  }
  public deleteOrderEmit(id: number) {
    this.deleteOrderEmitter.next(id);
  }
}
