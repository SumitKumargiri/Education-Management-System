import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showLoginPanel = false;
  showRegisterPanel = false;

  toggleLoginPanel(): void {
    this.showLoginPanel = !this.showLoginPanel;
  }

  toggleRegisterPanel(){
    this.showRegisterPanel = !this.showRegisterPanel;
  }
}
