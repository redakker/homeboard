import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HorizonService } from './horizon.service';

@Injectable()
export class UserService {

  users: any = new Subject();

  constructor(private horizonService: HorizonService) {
    this.horizonService.connect().then(() => {
      const users = this.horizonService.horizon('homeboard_users');
      users.watch().subscribe((result) => {
        for (const user of result) {
          const devices = this.horizonService.horizon('available_devices');
          devices.find({ mac: user.device }).watch().subscribe((res) => {
            user.dev = res;
          });
        }
        this.users.next(result);
      });
    });
  }

  getUserByUsername(username: string) {
    const promise = new Promise((resolve, reject) => {
      this.users.subscribe((users) => {
        for (const user of users) {
          if (user.username === username) {
            resolve(user);
          }
        }

      });
    });

    return promise;

  }

  getUserById(id: string) {
    return this.users.subscribe((users) => {
        for (const user of users) {
          if (user.id === id) {
            return user;
          }
        }
      });
  }
}
