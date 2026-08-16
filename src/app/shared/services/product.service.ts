import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(search?: string): Observable<ProductType[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<ProductType[]>('https://testologia.ru/tea', {params});
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

}
