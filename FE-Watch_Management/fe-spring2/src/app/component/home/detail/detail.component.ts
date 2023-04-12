import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {Image} from '../../entity/image';
import {Watch} from '../../entity/watch';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../service-login/token.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {ShareService} from '../../service-login/share.service';
import {LoginService} from '../../service-login/login.service';
import {Usert} from '../../entity/usert';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  imageList: Image[] = [];
  watchList: Watch[] = [];
  watchT: Watch = {images: []};
  priceMain: number | undefined = 0;
  idUserTest: string | null = '';
  idUser: number = 0;
  user: Usert = {};

  isLogged = false;
  role = 'none';

  quantity = 0;

  constructor(private watchService: WatchService,
              private activatedRoute: ActivatedRoute,
              private token: TokenService,
              private toast: ToastrService,
              private shareService: ShareService,
              private login: LoginService) {

  }

  ngOnInit(): void {
    this.loader();
    window.scroll(0, 650);
    this.getWatch();
  }


  getWatch() {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.watchService.getWatch(parseInt(id)).subscribe(next => {
          console.log(next);
          this.watchT = next;
          // @ts-ignore
          this.priceMain = next.price * 1.2;
          // console.log(next);
        }, error => {
          this.toast.error('Không có sản phẩm', 'Thông Báo');
        });
      }
    });
  }


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

  addCart(idWatch: any, quantity: number) {
    this.idUserTest = this.token.getId();
    if (this.idUserTest != null) {
      this.idUser = parseInt(this.idUserTest);
    }
    this.watchService.addCart(idWatch, this.idUser, quantity).subscribe(next => {
      this.toast.success('Thêm vào giỏ thành công', 'Thông Báo');
      this.shareService.sendClickEvent();
      console.log(next);
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
          title: 'Vui lòng đăng nhập để mua hàng',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
