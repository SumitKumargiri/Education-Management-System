import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  showMore: boolean = false;

  showparagraph() {
    this.showMore = true;
  }
}
