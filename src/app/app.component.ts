import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Currently no login in this page, but users can do interactions (for example send messages to the others)
  // We trust each other :)
  // This variable stores the current active user who will interact in the page
  // Click to user picture to change active user
  private activeUser: any = {};

  constructor() {}

  makeActive(user: any) {
    this.activeUser = user;
  }

}
