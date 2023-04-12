import { Component, OnInit } from '@angular/core';
import {CartHistory} from '../entity/cartHistory';
import {IOrderDetail} from '../dto/IOrderDetail';
import {TokenService} from '../service-login/token.service';
import {WatchService} from '../service-watch/watch.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-history-admin',
  templateUrl: './history-admin.component.html',
  styleUrls: ['./history-admin.component.css']
})
export class HistoryAdminComponent implements OnInit {

  cartList: CartHistory[] = [];
  orderDetailList: IOrderDetail[] = [];

  constructor(private tokenService: TokenService,
              private watchService: WatchService,
              private toast: ToastrService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Lịch sử mua hàng');
    window.scroll(0, 500);
    this.getCartHistory();
  }

  getCartHistory() {
    this.watchService.getHistoryAdmin().subscribe(next => {
      this.cartList = next;
    }, error => {
      this.toast.warning('Chưa có sản phẩm được mua');
    });
  }

  detailHistory(id: any) {
    this.watchService.getHistoryDetail(id).subscribe(next => {
      this.orderDetailList = next;
    }, error => {
      this.toast.warning('Chưa có sản phẩm được mua');
    });
  }

}
