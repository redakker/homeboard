import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HorizonService } from './horizon.service';

@Injectable()
export class SensorService {

  sensors: any = new Subject();

  constructor(private horizonService: HorizonService) {
  }
}
