import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HorizonService } from '../horizon.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: []
})
export class ChatComponent implements OnInit {

  private user: any = {};
  private disabled = true;
  private chats: any;
  private avatar: string;

  constructor(private horizonService: HorizonService, private eventService: EventService, private userService: UserService) {
    eventService.activated.subscribe(user => this.makeActive(user));
    this.user.avatar = 'emptyuser.png';
  }

  ngOnInit() {
    const user = this.eventService.getActiveUser();
    if (user) {
      this.user = user;
      this.disabled = false;
    }

    this.horizonService.connect().then(() => {
      const table = this.horizonService.horizon('chat');
      table.order('datetime', 'descending').limit(3).watch().subscribe((result) => {
        for (const chat of result) {
          const users = this.horizonService.horizon('homeboard_users');
          users.find({ id: chat.userid }).watch().subscribe((res) => {
            chat.avatar = res.avatar;
          });
        }
        this.chats = result;
      });
    });

    setInterval(function () {
            this.chats = this.chats;
    }, 30000);
  }

  makeActive(user: any) {
    this.user = user;
    this.disabled = false;
  }

  insertEmoji(emo: string, input: any) {
    if (!this.disabled) {
      input.value = input.value + ' ' + emo;
    }
  }

  sendMessage(input) {

    const message = input.value;

    if (!this.disabled && input.value !== '') {
      this.horizonService.connect().then(() => {
        const table = this.horizonService.horizon('chat');
        table.store({
          userid: this.user.id,
          text: message,
          datetime: new Date(),
        });

      });
      input.value = '';
    }
  }
}
