import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TransferValueService {

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() {

  }

  changeMessage(messageWatch: string) {
    this.messageSource.next(messageWatch);
  }

}
