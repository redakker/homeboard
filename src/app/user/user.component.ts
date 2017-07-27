import { Component, OnInit, Input } from '@angular/core';
import { HorizonService } from '../horizon.service';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: []
})
export class UserComponent implements OnInit {

  @Input() username: string;
  activeUser: any = {};
  user: any = {};
  active: boolean;
  eventservice: EventService;

  constructor(private horizonService: HorizonService, eventservice: EventService, private userService: UserService) {
    this.active = false;
    this.eventservice = eventservice;
    this.eventservice.activated.subscribe(user => this.makeActive(user));
  }

  ngOnInit() {
    this.userService.getUserByUsername(this.username).then((res: Response) => { this.user = res; });
  }

  getUserAvailibility() {
    if (this.user && this.user.dev && this.user.dev.status) {
      return true;
    } else {
      return false;
    }
  }

  makeActive(user) {
   this.activeUser = user;
  }

  chooseThisUser() {
    this.eventservice.activate(this.user);
  }

  isActive() {
    return (this.activeUser && this.activeUser.username === this.user.username);
  }



}
