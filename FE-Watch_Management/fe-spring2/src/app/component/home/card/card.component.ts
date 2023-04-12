import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {TokenService} from '../../service-login/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {ShareService} from '../../service-login/share.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {render} from 'creditcardpayments/creditCardPayments';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../service-login/login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Watch} from '../../entity/watch';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // idUser: number = 0;
  watch: Watch = {images: []};
  iOderDetailList: IOrderDetail[] = [];
  public countQuantity: number = 0;
  idUserTest: string | null = '';
  idUser: number = 0;
  totalMoney: number = 0;
  watchCount: number = 0;
  moneyConvert: number = 0;
  isShow = false;
  enter = false;
  errorQuantity: string[] = [];
  userForm: FormGroup;
  disablePayment = false;


  constructor(private watchService: WatchService,
              private token: TokenService,
              private activatedRoute: ActivatedRoute,
              private share: ShareService,
              private toast: ToastrService,
              private title: Title,
              private login: LoginService,
              private route: Router) {
    this.share.getClickEvent().subscribe(next => {
      this.getWatchInCart();
    });
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      idUser: new FormControl(),
      createDate: new FormControl(),
    });
  }

  render(value: string) {
    render(
      {
        id: '#payments',
        currency: 'USD',
        value: value,
        onApprove: (details) => {
          this.payWatch();
        }
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    window.scroll(0, 670);
    this.getWatchInCart();
  }


  getWatchInCart() {
    // this.title = '';
    this.idUserTest = this.token.getId();
    // console.log(this.idUser);
    if (this.idUserTest != null) {
      this.idUser = parseInt(this.idUserTest);
    }
    this.watchService.getWatchInCart(this.idUser, 'cart').subscribe(next => {
      this.iOderDetailList = next;
      this.iOderDetailList.forEach(item => {
        this.checkQuantity(item);
      });
      this.totalMoney = 0;
      this.watchCount = 0;
      for (let i = 0; i < this.iOderDetailList.length; i++) {
        // @ts-ignore
        this.totalMoney += this.iOderDetailList[i].money;
        this.watchCount += Number(this.iOderDetailList[i].quantity);
      }
      let totalMain = +((this.totalMoney / 23485.48).toFixed(2));
      this.moneyConvert = totalMain;
      this.share.changeData({
        quantity: this.watchCount
      });
    }, error => {
    });
  }

  show() {
    this.isShow = true;
    this.render(String(this.moneyConvert));
  }

  payWatch() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    this.userForm.value.createDate = formattedDate;
    // @ts-ignore
    this.userForm.value.idUser = +(this.token.getId());
    this.watchService.payWatch(this.userForm.value).subscribe(next => {
      this.enter = false;
      this.share.sendClickEvent();
      // this.getWatchInCart();
      Swal.fire({
        position: 'center',
        title: 'Thanh toán thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      });
      // window.scroll(0, 685);
      this.route.navigateByUrl('');
    }, error => {
      Swal.fire({
        position: 'center',
        title: 'Thanh toán thất bại',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }


  changeQuantity(valueChange: any, idWatch: any) {
    // console.log('Kis hieu' + valueChange, 'id-watch' + idWatch, 'id-user' + this.idUser);
    this.watchService.changeQuantity(this.idUser, parseInt(valueChange), idWatch).subscribe(next => {
      this.share.sendClickEvent();
      // console.log('Id user ' + this.idUser);
      // console.log('value change ' + valueChange);
      // console.log('Id watch ' + idWatch);
    }, error => {
      this.toast.error('Thay đổi thất bại', 'Thông báo');
    });
  }

  enterInfo() {
    this.login.getInfoUser(this.token.getId()).subscribe(next => {
      this.userForm.patchValue(next);
    }, error => {
      this.toast.error('Thông tin user rỗng', 'Thông Báo');
    });
    this.enter = true;
    window.scroll(0, 1450);
  }

  backCart() {
    this.enter = false;
    window.scroll(0, 685);
  }

  deleteInCart(idOrder: any) {
    this.watchService.deleteInCart(idOrder).subscribe(next => {
      this.share.sendClickEvent();
    }, error => {
      this.toast.error('Xoá sản phẩm thất bại', 'Thông Báo');
    });
  }

  checkQuantity(orderDetail: IOrderDetail) {
    this.disablePayment = false;
    this.watchService.getWatch(Number(orderDetail.idWatch)).subscribe(next => {
      this.watch = next;
      if (Number(this.watch.quantity) < orderDetail.quantity) {
        orderDetail.errorMessage = ' Tiếc quá! Số lượng trong kho chỉ còn: ' + this.watch.quantity + ' sản phẩm';
        this.disablePayment = true;
      }
      console.log(this.watch.quantity);
    });
  }


}
