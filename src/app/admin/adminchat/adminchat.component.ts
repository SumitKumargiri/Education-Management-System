import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.css']
})
export class AdminchatComponent implements OnInit {
  
  user: string = '';
  message: string = '';
  messages: { user: string, message: string, read: boolean }[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    let storedUsername = localStorage.getItem('username');
    this.user = storedUsername ? storedUsername.replace(/['"]+/g, '') : 'Unknown User';

    this.chatService.message$.subscribe(msg => {
      if (msg.user && msg.message) {
        this.messages.push(msg);
      }
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.user, this.message);
      this.message = '';
    }
  }

  markMessageAsRead(msg: { user: string, message: string }): void {
    this.chatService.markMessageAsRead(msg.user, msg.message);
  }
}
