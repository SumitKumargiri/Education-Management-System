import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterHomeComponent } from './outer-home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    // OuterHomeComponent
  ],
  imports: [
    CommonModule,
    // CarouselModule.forRoot()
  ]
})
export class OuterHomeModule { }
