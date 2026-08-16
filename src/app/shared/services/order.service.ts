import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {OrderType} from "../../../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public createOrder(data: OrderType): Observable<{success: boolean, message?: string }> {
    return this.http.post<{success: boolean, message?: string }>('https://testologia.ru/order-tea', data);
  }
}
