import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgForm } from '@angular/forms';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messageList: Message[];
  otherMessages: Message[];
  myMessages: Message[];
  currentuser: any;
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.currentuser = JSON.parse(localStorage.getItem('currentuser'));
    document.querySelector(
      '#show-username'
    ).textContent = this.currentuser.$username;
    this.messageService
      .getMessages()
      .snapshotChanges()
      .subscribe((item) => {
        this.messageList = [];
        this.myMessages = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['key'] = element.key;
          this.messageList.push(x as Message);
        });
      });
  }

  onSubmit(messageForm: NgForm) {
    this.messageService.sendMessage(messageForm.value);
    this.resetForm(messageForm);
  }
  resetForm(messageForm?: NgForm) {
    if (messageForm) messageForm.reset();
    this.messageService.selectedMessage = new Message();
  }
  onDelete($key: string) {
    this.messageService.deleteMessage($key);
  }
}
