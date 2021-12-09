import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';

import * as HighCharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(HighCharts);
import Tree from 'highcharts/modules/treemap';
Tree(HighCharts);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(HighCharts);
import { Chart } from 'angular-highcharts';
import { jsonEval } from '@firebase/util';


@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
})
export class MenuOverviewPage implements OnInit {
  isDesktop: boolean;
  column: any;
  pie: any;
  constructor(
    private screensizeService: ScreenSizeService,
    public router: Router,
    private crudService: CrudService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  maritalStatusCount: any;
  maritalStatusCount1: any;
  patientData: any;
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  ngOnInit() {

    this.crudService.getData('patientData').subscribe(
      res => {
        console.log(res);
        this.patientData = res;
      }
    );
    this.maritalStatusCount = [];
    let resP;
    this.crudService.getData('maritalStatusCount').subscribe(
      res => {

        this.maritalStatusCount1 = res;
        Object.keys(res).forEach((key) => {
          var value = res[key];
          this.maritalStatusCount.push({ name: value.statusTitle, y: value.statusCount });
        });






        this.populateColumnChart();

        this.populatePieChart();
        this.populateHeatMap();



























      }
    );


















  }















  populateColumnChart() {
    console.log(this.maritalStatusCount);
    this.column = new Chart({
      chart: {
        type: "column",
      },
      title: {
        text: 'Marital Status Count'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: ''
        }

      },

      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> {point.percentage:.0f} %'
      },

      series: [
        {
          name: "Status Count",
          colorByPoint: true,
          type: undefined,
          data: this.maritalStatusCount
        }
      ], credits: { enabled: false },
    });
  }







  populatePieChart() {
    let piechart = HighCharts.chart('asdasdasd', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Marital Status Count'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} <br /> {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.maritalStatusCount
      }],credits: { enabled: false },
    });
    setTimeout(() => { piechart.reflow() }, 1000);
  }


  populateHeatMap(){







    function getPointCategoryName(point, dimension) {
      var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
      return axis.categories[point[isY ? 'y' : 'x']];
    }

    HighCharts.chart('heatmap', {

      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },


      title: {
        text: 'Sales per employee per weekday'
      },

      xAxis: {
        categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
      },

      yAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        title: null,
        reversed: true
      },

      accessibility: {
        point: {
          descriptionFormatter: function (point) {
            var ix = point.index + 1,
              xName = getPointCategoryName(point, 'x'),
              yName = getPointCategoryName(point, 'y'),
              val = point.value;
            return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
          }
        }
      },

      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: HighCharts.getOptions().colors[0]
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },

      tooltip: {
        formatter: function () {
          return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
            this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
        }
      },
      series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        type: undefined,
        data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }], credits: { enabled: false },



    });

  }



}
