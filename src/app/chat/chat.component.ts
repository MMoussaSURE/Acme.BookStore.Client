import * as signalR from '@microsoft/signalr';
import { Component, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  protected readonly oAuthService = inject(OAuthService);
  messageList: any[] = [];

  targetUserName: string = '';
  message: string = '';
  connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44368/signalr-hubs/messaging`, {
        accessTokenFactory: () => this.oAuthService.getAccessToken(),
      })
      .build();

    this.connection.on('ReceiveMessage', this.handleMessage);

    this.connection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => console.error(err.toString()));
  }

  handleMessage = (message: any) => {
    this.messageList.push(message);
    console.log('deneme');
    console.log(message);
  };

  sendMessage() {
    this.connection
      .send('SendMessage', this.targetUserName, this.message)
      .then(() => {
        const newMessage = 'You : ' + this.message;
        this.messageList.push(newMessage);
      })
      .catch(err => console.log(err));
  }
}