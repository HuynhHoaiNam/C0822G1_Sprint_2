import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', {username: obj.username, password: obj.password});
  }

  updateUser(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/update', {
      username: this.tokenService.getUsername(),
      name: obj.name, phoneNumber: obj.phoneNumber, email: obj.email, age: obj.age, gender: obj.gender,
      dateOfBirth: obj.dateOfBirth, avatar: obj.avatar, address: obj.address
    });
  }

  register(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', {
      username: obj.username,
      name: obj.name,
      email: obj.email,
      password: obj.password,
      confirmPassword: obj.confirmPassword,
      roles: [obj.roles]
    });
  }

  changePassword(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/change-password', {
      username: this.tokenService.getUsername(),
      password: obj.password,
      newPassword: obj.newPassword,
      confirmPassword: obj.confirmPassword
    });
  }

  profile(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/auth/profile/' + id);
  }

  getInfoUser(idUser: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/auth/getInfoUser/' + idUser);
  }

  checkUserName(username: any): Observable<any> {
    let dto = {
      userName: username
    };
    return this.http.post<any>('http://localhost:8080/api/auth/check-userName', dto);
  }
}
