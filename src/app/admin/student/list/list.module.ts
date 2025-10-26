import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { UpdateComponent } from '../update/update.component';


const routes: Routes =[
  {path:'update', component:UpdateComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AsyncPipe
  ]
})
export class ListModule { }
