import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListWatchComponent} from './component/home/list-watch/list-watch.component';
import {CardComponent} from './component/home/card/card.component';
import {HeaderComponent} from './component/home/header/header.component';
import {FooterComponent} from './component/home/footer/footer.component';
import {DetailComponent} from './component/home/detail/detail.component';
import {HomeModule} from './component/home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './component/login/login.module';
import {ProfileComponent} from './component/profile/profile.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HistoryComponent} from './component/home/history/history.component';
import {WacthManagementComponent} from './component/home/wacth-management/wacth-management.component';
import { HistoryAdminComponent } from './component/history-admin/history-admin.component';
import {UpdateWatchComponent} from './component/home/update-watch/update-watch.component';

@NgModule({
  declarations: [
    AppComponent,
    ListWatchComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent,
    ProfileComponent,
    HistoryComponent,
    WacthManagementComponent,
    HistoryAdminComponent,
    UpdateWatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
