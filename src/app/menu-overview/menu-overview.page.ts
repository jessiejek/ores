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
  column:any;
  constructor(
    private screensizeService: ScreenSizeService,
    public router:Router,
    private crudService:CrudService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  maritalStatusCount:any;
  maritalStatusCount1:any;
  ngOnInit() {
    this.maritalStatusCount=[];
    let resP;
    this.crudService.getData('maritalStatusCount').subscribe(
      res=>{

        this.maritalStatusCount1 = res;
        Object.keys(res).forEach((key) => {
          var value = res[key];
          this.maritalStatusCount.push({name:value.statusTitle,y:value.statusCount});
        });
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
        ],  credits: { enabled: false },
        });
      }
      );









  }



}
