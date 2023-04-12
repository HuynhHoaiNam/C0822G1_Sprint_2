import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Watch} from '../entity/watch';
import {Image} from '../entity/image';
import {WatchType} from '../entity/watch-type';
import {IOrderDetail} from '../dto/IOrderDetail';
import {TrademarkT} from '../entity/trademarkT';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private httpClient: HttpClient) {
  }

  URL_WATCH = 'http://localhost:8080/api/watch';
  URL_CART = 'http://localhost:8080/api/cart';


  getListWatch(size: number, trademarkId: number, priceFirst: number, priceSecond: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_WATCH + '/list/' + trademarkId + '/' + priceFirst + '/' + priceSecond + '?size=' + size);
  }

  getWatch(id: number): Observable<Watch> {
    return this.httpClient.get<Watch>(this.URL_WATCH + '/watch-ob/' + id);
  }


  getWatchType(): Observable<WatchType[]> {
    return this.httpClient.get<WatchType[]>(this.URL_WATCH + '/watch-type');
  }

  create(watch: any) {
    return this.httpClient.post(this.URL_WATCH + '/create-watch', watch);
  }

  addCart(idWatch: number, idUser: number, quantity: number) {
    return this.httpClient.get(this.URL_WATCH + '/addOderDetail/' + idWatch + '/' + idUser + '/' + quantity);
  }

  getWatchInCart(idUser: number, flag?: any): Observable<IOrderDetail[]> {
    return this.httpClient.get<IOrderDetail[]>(this.URL_WATCH + '/get-watch-in-cart/' + idUser);
  }


  payWatch(Cart: any) {
    return this.httpClient.put<any>(this.URL_CART + '/pay-watch', Cart);
  }


  changeQuantity(idUser: number, valueChange: number, idWatch: number) {
    return this.httpClient.get(this.URL_WATCH + '/change-quantity/' + idUser + '/' + valueChange + '/' + idWatch);
  }

  getListTrademarkT(): Observable<TrademarkT[]> {
    return this.httpClient.get<TrademarkT[]>('http://localhost:8080/api/trademark/list');
  }

  getListWatchByName(nameWatch: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_WATCH + '/listByName/?nameWatch=' + nameWatch);
  }

  deleteInCart(idOrder: number) {
    return this.httpClient.delete(this.URL_CART + '/delete/' + idOrder);
  }

  getWatchManagement(page: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_WATCH + '/get-watch-management/?page=' + page);
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


  updateWatch(watch: Watch) {
    return this.httpClient.put(this.URL_WATCH + '/update-watch', watch);
  }

}
