import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private msgSubscription!: Subscription;

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.msgSubscription = this.wsService.getMessages().subscribe(
      (msg: string) => this.messages.push(msg),
      (err) => console.error(err)
    );
  }

  sendMessage(input: HTMLInputElement) {
    if (input.value) {
      this.wsService.sendMessage(input.value);
      input.value = '';
    }
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
    this.wsService.closeConnection();
  }
}
