import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OuterContactComponent } from './outer-contact.component';


const routes: Routes =[
  {path:'', component:OuterContactComponent}
]

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    // ContactFormComponent
  ]
})
export class OuterContactModule { }
