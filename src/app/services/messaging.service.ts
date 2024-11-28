import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private hubConnection: HubConnection;

  private receivedMessageSubject = new Subject<string>();
  public receivedMessage$: Observable<string>;

  constructor() {
    this.receivedMessage$ = this.receivedMessageSubject.asObservable();
  }


  startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44368/signalr-hubs/messaging') // Replace with your hub URL
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => {
        console.error('Error while starting connection: ' + err);
      });
  }

sendMessage(targetUserName: string, message: string): void {
    this.hubConnection.invoke('SendMessage', targetUserName, message)
      .catch(err => {
        console.error('Error while sending message: ' + err);
      });
  }

  receiveMessage(): void {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('recived message')
      this.receivedMessageSubject.next(message);
    });
  }


}
