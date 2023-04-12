import {Component, OnInit} from '@angular/core';
import {Usert} from '../../entity/usert';
import {LoginService} from '../../service-login/login.service';
import {TokenService} from '../../service-login/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../service-login/share.service';
import {WatchService} from '../../service-watch/watch.service';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {BehaviorSubject} from 'rxjs';
import {TransferValueService} from '../../service-value/transfer-value.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Usert = {};
  role = 'none';
  name = 'Đăng nhập';
  isLogged = false;
  totalQuantity: number = 0;
  iOderDetailList: IOrderDetail[] = [];
  quantity = 0;
  messageWatch: string = '';


  constructor(private login: LoginService,
              private token: TokenService,
              private router: Router,
              private share: ShareService,
              private watchService: WatchService,
              private transferValueService: TransferValueService,
              private title: Title) {

  }

  ngOnInit(): void {
    this.transferValueService.currentMessage.subscribe(message => this.messageWatch = message);
    // console.log(this.messageWatch);
    this.loader();
    this.share.getClickEvent().subscribe(next => {
      this.loader();
    });
  }

  getValue() {
    this.quantity = 0;
    for (let i = 0; i < this.iOderDetailList.length; i++) {
      this.quantity += this.iOderDetailList[i].quantity;
    }
  }

  loader() {
    let id = this.token.getId();
    if (id != null) {
      this.watchService.getWatchInCart(parseInt(id)).subscribe(next => {
        this.iOderDetailList = next;
        this.getValue();
      });
    }
    this.share.getData.subscribe(data => {
      this.totalQuantity = Number(data.quantity);
    });
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.role = this.token.getRole();
      this.login.profile(this.token.getId()).subscribe(
        next => this.user = next
      );
    }

  }

  logout() {
    this.role = 'none';
    this.isLogged = false;
    this.token.logout();
    this.router.navigateByUrl('');
  }


  newValue(newValue: string) {
    this.transferValueService.changeMessage(newValue);
  }

  trademark() {
    this.title.setTitle('Các Thương Hiệu');
    window.scroll(0, 2000);
  }

  home() {
    this.title.setTitle('Danh Sách Sản Phẩm');
    window.scroll(0, 750);
  }

  introduce() {
    this.title.setTitle('Giới thiệu');
    window.scroll(0, 3000);
  }
}
