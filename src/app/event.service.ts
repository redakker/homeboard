import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class EventService {

  private activeUser: any;
  activated: EventEmitter<any>;


  constructor() {
    this.activated = new EventEmitter();
    console.log('Eventemitter initiated');
  }

  public getActiveUser() {
    return this.activeUser;
  }

  public activate(user: any): void {
    this.activeUser = user;
    this.activated.emit(this.activeUser);
  }

}
