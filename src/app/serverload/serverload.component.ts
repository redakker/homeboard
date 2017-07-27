import { Component, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { HorizonService } from '../horizon.service';

@Component({
  selector: 'app-serverload',
  templateUrl: './serverload.component.html',
  styleUrls: ['./serverload.component.scss'],
  providers: [HorizonService]
})
export class ServerloadComponent implements OnInit {

  private chart: any;
  private loaddata: any;
  private lastRefresh: any;
  private res;

  constructor(private AmCharts: AmChartsService, private horizonService: HorizonService) { }

  ngOnInit() {

    this.chart = this.AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'categoryField': 'time',
      'startDuration': 1,
      'categoryAxis': {
        'gridPosition': 'start'
      },
      'trendLines': [],
      'graphs': [
        {
          'balloonText': '[[time]] -> [[load]]',
          'bullet': 'round',
          'id': 'AmGraph-1',
          'title': 'load',
          'type': 'smoothedLine',
          'valueField': 'load'
        }

      ],
      'guides': [],
      'valueAxes': [
        {
          'id': 'ValueAxis-1',
          'title': 'Server load'
        }
      ],
      'allLabels': [],
      'balloon': {},
      'legend': {
        'enabled': true,
        'useGraphSettings': true
      },
      'titles': [
        {
          'id': 'Title-1',
          'size': 15,
          'text': ''
        }
      ],
      'dataProvider': [
        /*
        {
          "time": "2017-12-12",
          "load": 100
        },
        {
          "time": "2017-12-13",
          "load": 6
        },
        {
          "time": "2017-12-14",
          "load": 2
        }
        */
      ]
    });

    // Update chart from database
    this.horizonService.connect().then(() => {
      this.horizonService.horizon('serverload').order('time', 'descending').limit(20).watch().subscribe((result) => {

      // this.res = result;
      this.refreshChart(result.reverse());
      });
    });

  }

  refreshChart(result) {

    for (let i = 0; i < result.length; i++ ) {
      /*
        var element = result[i];
        var formattedTime = element.time;
        //element.time = formattedTime.getFullYear() + "-" + /
        (formattedTime.getMonth() + 1) + "-" + formattedTime.getDate() + " " + /
         formattedTime.getHours() + ":" + formattedTime.getMinutes() + ":" + formattedTime.getSeconds();
        element.time = ("0" + formattedTime.getHours()).slice(-2) + ":" +/
         ("0" + formattedTime.getMinutes()).slice(-2) + ":" + ("0" + formattedTime.getSeconds()).slice(-2);
        */
        result[i].time = '';
      }


    this.AmCharts.updateChart(this.chart, () => {

      this.chart.dataProvider = result;
      this.lastRefresh = result[result.length - 1].time;
      this.lastRefresh = new Date();

    });


  }



}
