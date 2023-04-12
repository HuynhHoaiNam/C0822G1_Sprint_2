import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../service-login/token.service';
import {WatchService} from '../../service-watch/watch.service';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {CartHistory} from '../../entity/cartHistory';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

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
    this.watchService.getHistory(Number(this.tokenService.getId())).subscribe(next => {
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
