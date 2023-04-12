import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {
  }


  URL_CART = 'http://localhost:8080/api/cart';


  payWatch(Cart: any) {
    return this.httpClient.put<any>(this.URL_CART + '/pay-watch', Cart);
  }

  deleteInCart(idOrder: number) {
    return this.httpClient.delete(this.URL_CART + '/delete/' + idOrder);
  }

  getHistory(idUser: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_CART + '/history/' + idUser);
  }


  getHistoryDetail(idCart: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_CART + '/get-detail-history/' + idCart);
  }

  getHistoryAdmin(): Observable<any> {
    return this.httpClient.get<any>(this.URL_CART + '/history-admin');
  }

}
