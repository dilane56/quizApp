import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HomeComponent
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
