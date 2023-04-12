import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {Watch} from '../../entity/watch';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup} from '@angular/forms';
import {TrademarkT} from '../../entity/trademarkT';
import {WatchType} from '../../entity/watch-type';
import {Image} from '../../entity/image';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-update-watch',
  templateUrl: './update-watch.component.html',
  styleUrls: ['./update-watch.component.css']
})
export class UpdateWatchComponent implements OnInit {
  watchT: Watch = {images: []};
  watchForm: FormGroup;
  trademarkTList: TrademarkT[] = [];
  watchTypeList: WatchType[] = [];

  constructor(private watchService: WatchService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private route: Router,
              private title: Title) {
    this.watchForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      origin: new FormControl(),
      face: new FormControl(),
      strapType: new FormControl(),
      flag: new FormControl(),
      note: new FormControl(),
      color: new FormControl(),
      trademarkT: new FormControl(),
      watchType: new FormControl(),
      images: new FormControl(),
      quantity: new FormControl(),
    });
  }

  compareFun(item1: TrademarkT, item2: TrademarkT) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  compareFunWatchType(item1: WatchType, item2: WatchType) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  ngOnInit(): void {
    this.title.setTitle('Chỉnh sửa thông tin sản phẩm');
    window.scroll(0, 700);
    this.getWatchByUpdate();
    this.getListTrademarkT();
    this.getListWatchType();
  }

  getWatchByUpdate() {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.watchService.getWatch(parseInt(id)).subscribe(next => {
          this.watchForm.patchValue(next);
        }, error => {
          this.toast.error('Không có sản phẩm', 'Thông Báo');
        });
      }
    });
  }

  getListTrademarkT() {
    this.watchService.getListTrademarkT().subscribe(next => {
      this.trademarkTList = next;
    }, error => {
      this.toast.warning('Hãng sản xuất rỗng', 'Thông Báo');
    });
  }

  updateWatch() {
    console.log(this.watchForm.value);
    this.watchService.updateWatch(this.watchForm.value).subscribe(next => {
      this.toast.success('Cập nhật thành công', 'Thông Báo');
      this.route.navigateByUrl('/watchManagement');
    }, error => {
      this.toast.error('Cập nhật thất bại', 'Thông Báo');
    });
  }

  getListWatchType() {
    this.watchService.getWatchType().subscribe(next => {
      this.watchTypeList = next;
    }, error => {
      this.toast.warning('Hãng sản xuất rỗng', 'Thông Báo');
    });
  }
}
