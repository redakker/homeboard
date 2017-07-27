import { Component, OnInit, Input } from '@angular/core';
import { HorizonService } from '../horizon.service';
import { SensorService } from '../sensor.service';

@Component({
    selector: 'app-sensor',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
    @Input() device: string;
    @Input() iconOn: string;
    @Input() iconOff: string;
    @Input() buttonStyleOn: string;
    @Input() buttonStyleOff: string;
    @Input() type: string;
    @Input() unit: string;

    private sensor: any = {};

    constructor(private horizonService: HorizonService, private sensorService: SensorService) { }

    ngOnInit() {
        this.horizonService.connect().then(() => {
            const sensors = this.horizonService.horizon('sensors');
            sensors.find({ device: this.device }).watch().subscribe((result) => {
                this.sensor = result;
            });
        });

        setInterval(function () {
            this.sensor = this.sensor;
        }, 30000);
    }

    getIcon() {
        if (this.sensor) {
            if (this.sensor.value === 1) {
                return this.iconOn;
            } else {
                return this.iconOff;
            }
        } else {
            return 'fa-hourglass-o';
        }
    }

    getButtonStyle() {
        if (this.sensor) {
            if (this.sensor.value === 1) {
                return this.buttonStyleOn;
            } else {
                return this.buttonStyleOff;
            }
        } else {
            return 'btn-default';
        }
    }



}
