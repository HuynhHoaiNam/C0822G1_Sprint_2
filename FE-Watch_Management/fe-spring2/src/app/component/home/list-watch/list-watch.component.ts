import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {Watch} from '../../entity/watch';
import {Image} from '../../entity/image';
import {WatchPage} from '../../dto/watch-page';
import {TokenService} from '../../service-login/token.service';
import {ToastrService} from 'ngx-toastr';
import {TrademarkT} from '../../entity/trademarkT';
import {FormControl, FormGroup} from '@angular/forms';
import {PriceSearch} from '../../entity/priceSearch';
import {IWatch} from '../../dto/IWatch';
import {ActivatedRoute} from '@angular/router';
import {TransferValueService} from '../../service-value/transfer-value.service';
import Swal from 'sweetalert2';
import {ShareService} from '../../service-login/share.service';
import {Title} from '@angular/platform-browser';
import {Usert} from '../../entity/usert';
import {LoginService} from '../../service-login/login.service';

@Component({
  selector: 'app-list-watch',
  templateUrl: './list-watch.component.html',
  styleUrls: ['./list-watch.component.css']
})
export class ListWatchComponent implements OnInit {
  watchList: IWatch[] = [];
  watchPage!: WatchPage;
  size: number = 8;
  trademarkTList: TrademarkT[] = [];
  priceSearchList: PriceSearch[] = [{
    idP: 1,
    priceFirst: 0,
    priceSecond: 500000,
    namePrice: 'Dưới 0,5 Triệu'
  }, {
    idP: 2,
    priceFirst: 500000,
    priceSecond: 3000000,
    namePrice: '0,5 Triệu- 3 Triệu'
  }, {
    idP: 3,
    priceFirst: 3000000,
    priceSecond: 5000000,
    namePrice: '3 Triệu- 5 Triệu'
  }, {
    idP: 4,
    priceFirst: 5000000,
    priceSecond: 10000000,
    namePrice: '5 Triệu- 10 Triệu'
  }, {
    idP: 5,
    priceFirst: 10000000,
    priceSecond: 18000000,
    namePrice: '10 Triệu- 18 Triệu'
  }, {
    idP: 6,
    priceFirst: 18000000,
    priceSecond: 900000000,
    namePrice: 'Trên 18 Triệu'
  }];

  trademarkId: number = -1;
  priceFirst: number = -1;
  priceSecond: number = -1;
  firstT: any;
  lastT: any;
  priceS: string = '';
  searchForm: FormGroup;
  messageWatch: string = '';
  idUserTest: string | null = '';
  idUser: number = 0;

  user: Usert = {};

  isLogged = false;
  role = 'none';

  constructor(private watchService: WatchService,
              private token: TokenService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private transferValueService: TransferValueService,
              private shareService: ShareService,
              private title: Title,
              private login: LoginService) {
    this.searchForm = new FormGroup({
      idT: new FormControl(),
      priceForm: new FormGroup({
        idP: new FormControl(),
        priceFirst: new FormControl(),
        priceSecond: new FormControl(),
        namePrice: new FormControl()
      })
    });
  }

  ngOnInit(): void {
    this.loader();
    this.title.setTitle('Danh sách sản phẩm');
    window.scroll(0, 750);
    this.transferValueService.currentMessage.subscribe(message => {
      this.messageWatch = message;
      if (message != '') {
        this.getListWatchByName();
      } else {
        this.getList(this.size, this.trademarkId, this.priceFirst, this.priceSecond, message);
      }
    });
    this.getListTrademarkT();
  }


  getList(size: number, trademarkId: any, priceFirst: any, priceSecond: any, message: any) {
    // console.log('getList' + message);
    // console.log('trademarkId ' + trademarkId);
    this.trademarkId = trademarkId;
    this.priceFirst = priceFirst;
    this.priceSecond = priceSecond;
    if (message == undefined || message == '') {
      this.watchService.getListWatch(size, this.trademarkId, this.priceFirst, this.priceSecond).subscribe(next => {
        this.watchPage = next;
        this.watchList = next.content;
        this.size = next.size;
        this.firstT = next.first;
        this.lastT = next.last;
      }, error => {
        this.toast.warning('Không có sản phẩm cần tìm', 'Thông Báo');
      });
    }
  }

  getListWatchByName() {
    // console.log('getByName ' + this.messageWatch);
    if (this.messageWatch != '') {
      this.watchService.getListWatchByName(this.messageWatch).subscribe(next => {
        console.log(next);
        this.watchPage = next;
        this.watchList = next.content;
        this.size = next.size;
        this.firstT = next.first;
        this.lastT = next.last;
      }, error => {
        this.toast.warning('Không có sản phẩm cần tìm', 'Thông Báo');
      });
    }
  }

  getListTrademarkT() {
    this.watchService.getListTrademarkT().subscribe(next => {
      this.trademarkTList = next;
    }, error => {
      this.toast.warning('Hãng sản xuất rỗng', 'Thông Báo');
    });
  }

  // addCartInList(idWatch: any) {
  //   this.idUserTest = this.token.getId();
  //   if (this.idUserTest != null) {
  //     this.idUser = parseInt(this.idUserTest);
  //   }
  //   this.watchService.addCart(idWatch, this.idUser).subscribe(next => {
  //     this.toast.success('Thêm vào giỏ thành công', 'Thông Báo');
  //     this.shareService.sendClickEvent();
  //   }, error => {
  //     Swal.fire({
  //       position: 'center',
  //       title: 'Vui lòng đăng nhập để mua hàng',
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000
  //     });
  //   });
  // }

  loader() {
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.role = this.token.getRole();
      this.login.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
        });
      this.role = this.token.getRole();
    }
  }


  addCartInList(idWatch: any) {
    this.idUserTest = this.token.getId();
    if (this.idUserTest != null) {
      this.idUser = parseInt(this.idUserTest);
    }
    this.watchService.addCart(idWatch, this.idUser, 1).subscribe(next => {
      this.toast.success('Thêm vào giỏ thành công', 'Thông Báo');
      this.shareService.sendClickEvent();
    }, error => {
      if (error.error.text == 'too much') {
        Swal.fire({
          position: 'center',
          title: 'Số lượng trong kho không đủ',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          position: 'center',
          title: 'Số lượng trong kho không đủ',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
}
