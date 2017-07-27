import { Component, OnInit } from '@angular/core';
import { HorizonService } from '../horizon.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [HorizonService]
})
export class WelcomeComponent implements OnInit {

  list = [];
  table: any;

  constructor(private horizonService: HorizonService) {}

  ngOnInit() {
    this.horizonService.connect().then(() => {
      this.horizonService.horizon('sensors').watch().subscribe((result) => {
        console.log('result', result);
        this.list = result;
      });
    });
  }

};
