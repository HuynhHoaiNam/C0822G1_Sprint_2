import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./component/home/home-routing.module').then(module => module.HomeRoutingModule)},
  {path: 'login', loadChildren: () => import('./component/login/login-routing.module').then(module => module.LoginRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
