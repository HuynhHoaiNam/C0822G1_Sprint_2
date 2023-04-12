import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {Watch} from '../../entity/watch';
import {ToastrService} from 'ngx-toastr';
import {WatchPageManagement} from '../../entity/watchPageManagement';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-wacth-management',
  templateUrl: './wacth-management.component.html',
  styleUrls: ['./wacth-management.component.css']
})
export class WacthManagementComponent implements OnInit {
  watchList: Watch[] = [];
  watchPage!: WatchPageManagement;
  page: number = 0;
  watchT: Watch = {images: []};

  constructor(private watchService: WatchService,
              private toast: ToastrService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Quản lý sản phẩm');
    window.scroll(0, 370);
    this.getWatchManagement(this.page);
  }


  getWatchManagement(page: number) {
    this.watchService.getWatchManagement(page).subscribe(next => {
      this.watchList = next.content;
      this.watchPage = next;
    }, error => {
      this.toast.warning('Danh sách sản phẩm rỗng', 'Thông báo');
    });
  }

  changePage(page: number) {
    this.getWatchManagement(page);
  }

  detailWatch(id: any) {
    this.watchService.getWatch(id).subscribe(next => {
      this.watchT = next;
    }, error => {
      this.toast.warning('Danh sách sản phẩm rỗng', 'Thông báo');
    });
  }
}
