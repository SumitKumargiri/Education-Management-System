import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<ChatMessage>({ user: '', message: '', read: false });
  message$ = this.messageSource.asObservable();
  private messages: ChatMessage[] = [];
  private pendingMessages: { user: string, message: string }[] = [];

  constructor() {
    this.startConnection();
    this.addMessageListener();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7166/chathub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.processPendingMessages();
      })
      .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected');
      this.processPendingMessages();
    });
  }

  private addMessageListener() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string, read: boolean) => {
      const newMessage: ChatMessage = { user, message, read };
      this.messages.push(newMessage);
      this.messageSource.next(newMessage);
    });

    this.hubConnection.on('MessageSeen', (user: string, message: string) => {
      const msgIndex = this.messages.findIndex(msg => msg.user === user && msg.message === message);
      if (msgIndex > -1) {
        this.messages[msgIndex].read = true;
        this.messageSource.next(this.messages[msgIndex]);
      }
    });
  }

  sendMessage(user: string, message: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMessage', user, message)
        .catch(err => console.error('Error while sending message: ' + err));
    } else {
      console.warn('Connection not established. Queueing message.');
      this.pendingMessages.push({ user, message });
    }
  }

  markMessageAsRead(user: string, message: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('MessageSeen', user, message)
        .catch(err => console.error('Error while marking message as read: ' + err));
    } else {
      console.warn('Connection not established. Cannot mark message as read.');
    }
  }

  private processPendingMessages() {
    while (this.pendingMessages.length > 0) {
      const msg = this.pendingMessages.shift();
      if (msg) {
        this.sendMessage(msg.user, msg.message);
      }
    }
  }
}
