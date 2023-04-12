import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CreateWatchComponent } from './create-watch/create-watch.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateWatchComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
