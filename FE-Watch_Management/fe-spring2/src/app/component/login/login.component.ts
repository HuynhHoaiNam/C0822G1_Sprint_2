import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../service-login/login.service';
import {TokenService} from '../service-login/token.service';
import {ShareService} from '../service-login/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = 'Thông tin cá nhân';
  message = '';
  nameError = '';
  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(true)
  });
  registerForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    roles: new FormControl('customer')
  });
  islogged = false;
  clickButton = false;

  constructor(private title: Title,
              private loginService: LoginService,
              private token: TokenService, private router: Router,
              private share: ShareService) {
  }

  ngOnInit(): void {
    window.scroll(0, 620);
    this.title.setTitle('Trang Đăng Nhập');
    this.islogged = this.token.isLogger();
    if (this.islogged) {
      this.router.navigateByUrl('');
    }
  }

  login() {
    // console.log(this.form.value);
    this.loginService.login(this.form.value).subscribe(next => {
        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'local');

        } else {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'session');
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thông báo',
          text: 'Đăng nhập thành công',
          showConfirmButton: false,
          timer: 2000
        });
        this.share.sendClickEvent();
        this.router.navigateByUrl('/');
      }, error => {
        this.message = error.error.message;
      }
    );
  }

  register() {
    this.nameError = '';
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    // console.log(this.registerForm.value);
    this.loginService.register(this.registerForm.value).subscribe(next => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng kí thành công!',
        text: 'Chúc mừng ' + this.registerForm.controls.name.value + ' đã có tài khoản',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        location.href = ('http://localhost:4200/login');
      }, 2300);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Đăng kí thất bại!',
        text: 'Vui lòng điền thông tin đầy đủ',
        showConfirmButton: false,
        timer: 2000
      });
      for (let i = 0; i < error.error.length; i++) {
        if (error.error[i].field == 'name') {
          this.nameError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'username') {
          this.usernameError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'email') {
          this.emailError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'password') {
          this.passwordError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'confirmPassword') {
          this.confirmPasswordError = error.error[i].defaultMessage;
        }
      }
      this.clickButton = true;
    });
  }

  checkUserName(userName: string) {
    this.loginService.checkUserName(userName).subscribe(next => {
      if (next == true) {
        this.registerForm.controls.username.setErrors({'checkUser': true});
      }
    });
  }
}
