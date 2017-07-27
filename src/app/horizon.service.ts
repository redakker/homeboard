import { Injectable } from '@angular/core';
import Horizon from '@horizon/client';
import { environment } from 'environments/environment';


@Injectable()
export class HorizonService {

  public horizon: any;
  status: {} | Boolean = false;

  constructor() { }

  connect() {
    const dbUrl = environment.dbUrl;
    this.horizon = Horizon({ host: dbUrl});

    const promise = new Promise((resolve, reject) => {
      this.horizon.onReady((status) => {
        this.status = status;
        resolve(status);
      });
      this.horizon.connect();
    });

    return promise;
  }

}
