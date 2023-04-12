import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  private data=new BehaviorSubject<any>({
    quantity : 0
  });

  changeData(data:any){
    this.data.next(data);
  }

  getData=this.data.asObservable();
}
