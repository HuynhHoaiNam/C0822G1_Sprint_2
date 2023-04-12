import {Component, OnInit} from '@angular/core';
import {WatchService} from '../../service-watch/watch.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TrademarkT} from '../../entity/trademarkT';
import {WatchType} from '../../entity/watch-type';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-create-watch',
  templateUrl: './create-watch.component.html',
  styleUrls: ['./create-watch.component.css']
})
export class CreateWatchComponent implements OnInit {
  watchTypeList: WatchType[] = [];
  selectedImage: any = null;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined;
  src: string | undefined;
  watchForm: FormGroup = new FormGroup({});


  constructor(private storage: AngularFireStorage,private watchService: WatchService,
              private router: Router) {
    this.watchForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('',),
      price: new FormControl('',),
      origin: new FormControl('',),
      face: new FormControl('',),
      strapType: new FormControl(''),
      note: new FormControl(''),
      color: new FormControl('',),
      trademarkt: new FormControl('',),
      watchType: new FormControl('',)
    });
  }

  ngOnInit(): void {
    this.getWatchTypeList();
  }

  create() {
    this.watchService.create(this.watchForm.value).subscribe(next => {
      alert('Thêm mới thành công');
      this.router.navigateByUrl('/');
    }, error => {
      alert('Thất bại');
    });
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.fb = url;
            }
            this.watchForm.patchValue({image: url});
          });
        })
      )
      .subscribe();
  }
  getWatchTypeList(){
    this.watchService.getWatchType().subscribe(next=>{
      this.watchTypeList=next;
    }, error => {
      alert("Rỗng watch-type")
    })
  }
}
