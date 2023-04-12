import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListWatchComponent} from './list-watch/list-watch.component';
import {CardComponent} from './card/card.component';
import {DetailComponent} from './detail/detail.component';
import {CreateWatchComponent} from './create-watch/create-watch.component';
import {HistoryComponent} from './history/history.component';
import {WacthManagementComponent} from './wacth-management/wacth-management.component';
import {HistoryAdminComponent} from '../history-admin/history-admin.component';
import {AdminGuard} from '../service-login/admin.guard';
import {CustomerGuard} from '../service-login/customer.guard';
import {UpdateWatchComponent} from './update-watch/update-watch.component';

const routes: Routes = [
  {path: '', component: ListWatchComponent},
  // {path: 'home/:nameWatch', component: ListWatchComponent},
  {path: 'card', component: CardComponent, canActivate: [CustomerGuard]},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'createWatch', component: CreateWatchComponent, canActivate: [AdminGuard]},
  {path: 'history', component: HistoryComponent},
  {path: 'watchManagement', component: WacthManagementComponent, canActivate: [AdminGuard]},
  {path: 'historyAdmin', component: HistoryAdminComponent, canActivate: [AdminGuard]},
  {path: 'update/:id', component: UpdateWatchComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
