import { Component, OnInit, Input, Output } from '@angular/core';
import { HorizonService } from '../horizon.service';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
    @Input() mac: string;
    @Input() iconOn: string;
    @Input() iconOff: string;
    @Input() buttonStyleOn: string;
    @Input() buttonStyleOff: string;
    @Input() type: string;
    @Input() unit: string;

    private device: any = {};

    constructor(private horizonService: HorizonService, private sensorService: SensorService) { }

    ngOnInit() {
        this.horizonService.connect().then(() => {
            const sensors = this.horizonService.horizon('available_devices');
            sensors.find({ mac: this.mac }).watch().subscribe((result) => {
                this.device = result;
            });
        });

        setInterval(function () {
            this.device = this.device;
        }, 30000);
    }

    getIcon(device) {
        console.log(device);
        if (device) {
            if (device.status === 1) {
                return this.iconOn;
            } else {
                return this.iconOff;
            }
        } else {
            return 'fa-hourglass-o';
        }
    }

    getButtonStyle(device) {
        if (device) {
            if (device.status === 1) {
                return this.buttonStyleOn;
            } else {
                return this.buttonStyleOff;
            }
        } else {
            return 'btn-default';
        }
    }
}
