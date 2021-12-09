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
  gender:any = 'M';
  type:any = 'Current Smoker';
  age:any = '20';
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
        //console.log(res);
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
        this.dataChange('a');






        this.dataprofile2=[];
        this.crudService.getDocsByParam('data-profile2','MARITAL STATUS','==','MARRIED').subscribe(
          (res)=>{
            if (res.docs.length === 0) {
              // //console.log('Document not found! Try again!');

              //this.message = 'Document not found! Try again!';
              //this.single = null;
            } else {
              res.docs.forEach(doc => {
                //this.message = '';
                //this.single = doc.data();
                ////console.log(doc.data());
                this.dataprofile2.push(doc.data());
              })
            }

          },(error) => {

          },() =>{
           // //console.log('done');
            ////console.log(this.dataprofile2);

            this.dataprofile2.forEach(element => {
              let smoking:any="yes";
              if(element['SMOKING'].indexOf("Never")){
                smoking = "no";
              }
              /*//console.log(
                'Smoker? : '+ element['SMOKING'] +' | '+
                'Age : '+element['AGE']+' | '+
                'Chole : '+ (element['CHOL(mgdL) Normal Value < 200 mgdL']/38.67).toFixed(2) + ' | ' +
                'SBP : ' + element['SBP']

                );*/

            });
          }
        );



















      }
    );
  }

  v00=0;v01=0;v02=0;v03=0;v04=0;
  v10=0;v11=0;v12=0;v13=0;v14=0;
  v20=0;v21=0;v22=0;v23=0;v24=0;
  v30=0;v31=0;v32=0;v33=0;v34=0;
  v40=0;v41=0;v42=0;v43=0;v44=0;
  dataChange(data){

    if(this.heatMap != undefined){
      this.heatMap.destroy();
    }
    //this.populateHeatMap();

    if(this.gender != undefined && this.type != undefined && this.age != undefined ){

      this.v00=0;this.v01=0;this.v02=0;this.v03=0;this.v04=0;
      this.v10=0;this.v11=0;this.v12=0;this.v13=0;this.v14=0;
      this.v20=0;this.v21=0;this.v22=0;this.v23=0;this.v24=0;
      this.v30=0;this.v31=0;this.v32=0;this.v33=0;this.v34=0;
      this.v40=0;this.v41=0;this.v42=0;this.v43=0;this.v44=0;

      //this.populateHeatMap();
      this.crudService.getHeatMapData('data-profile2',this.gender,this.type,this.age).subscribe(
        res=>{
          if (res.docs.length === 0) {
          } else {
            res.docs.forEach(doc => {
              this.dataprofile2.push(doc.data());
            })
          }

        },(error) => {

        },() =>{
         // //console.log('done');
          console.log(this.dataprofile2.length);

          this.dataprofile2.forEach(element => {
            let CHOLES = (element['CHOL(mgdL) Normal Value < 200 mgdL']/38.67);
            let SBP = element['SBP'];

            console.log(SBP+ ' | '+CHOLES);

            if( SBP >= 180 && CHOLES >= 4 && CHOLES < 5 ){
              this.v00 += 1;
            }else if(SBP >= 160 && SBP < 180 && CHOLES >= 4 && CHOLES < 5){
              this.v01 += 1;
            }else if(SBP >= 140 && SBP < 160 && CHOLES >= 4 && CHOLES < 5){
              this.v02 += 1;
            }else if(SBP >= 120 && SBP < 140 && CHOLES >= 4 && CHOLES < 5){
              this.v03 += 1;
            }else if(SBP >= 110 && SBP < 120 && CHOLES >= 4 && CHOLES < 5){
              this.v04 += 1;
            }

            if( SBP >= 180 && CHOLES >= 5 && CHOLES < 6 ){
              this.v10 += 1;
            }else if(SBP >= 160 && SBP < 180 && CHOLES >= 5 && CHOLES < 6){
              this.v11 += 1;
            }else if(SBP >= 140 && SBP < 160 && CHOLES >= 5 && CHOLES < 6){
              this.v12 += 1;
            }else if(SBP >= 120 && SBP < 140 && CHOLES >= 5 && CHOLES < 6){
              this.v13 += 1;
            }else if(SBP >= 110 && SBP < 120 && CHOLES >= 5 && CHOLES < 6){
              this.v14 += 1;
            }

            if( SBP >= 180 &&                   CHOLES >= 6 && CHOLES < 7 ){
              this.v20 += 1;
            }else if(SBP >= 160 && SBP < 180 && CHOLES >= 6 && CHOLES < 7){
              this.v21 += 1;
            }else if(SBP >= 140 && SBP < 160 && CHOLES >= 6 && CHOLES < 7){
              this.v22 += 1;
            }else if(SBP >= 120 && SBP < 140 && CHOLES >= 6 && CHOLES < 7){
              this.v23 += 1;
            }else if(SBP >= 110 && SBP < 120 && CHOLES >= 6 && CHOLES < 7){
              this.v24 += 1;
            }

            if( SBP >= 180 &&                   CHOLES >= 7 && CHOLES < 8 ){
              this.v30 += 1;
            }else if(SBP >= 160 && SBP < 180 && CHOLES >= 7 && CHOLES < 8){
              this.v31 += 1;
            }else if(SBP >= 140 && SBP < 160 && CHOLES >= 7 && CHOLES < 8){
              this.v32 += 1;
            }else if(SBP >= 120 && SBP < 140 && CHOLES >= 7 && CHOLES < 8){
              this.v33 += 1;
            }else if(SBP >= 110 && SBP < 120 && CHOLES >= 7 && CHOLES < 8){
              this.v34 += 1;
            }

            if( SBP >= 180 &&                   CHOLES >= 8 ){
              this.v40 += 1;
            }else if(SBP >= 160 && SBP < 180 && CHOLES >= 8 ){
              this.v41 += 1;
            }else if(SBP >= 140 && SBP < 160 && CHOLES >= 8 ){
              this.v42 += 1;
            }else if(SBP >= 120 && SBP < 140 && CHOLES >= 8){
              this.v43 += 1;
            }else if(SBP >= 110 && SBP < 120 && CHOLES >= 8){
              this.v44 += 1;
            }
            /*//console.log(
              'Smoker? : '+ element['SMOKING'] +' | '+
              'Age : '+element['AGE']+' | '+
              'Chole : '+ (element['CHOL(mgdL) Normal Value < 200 mgdL']/38.67).toFixed(2) + ' | ' +
              'SBP : ' + element['SBP']

              );*/

          });

          this.populateHeatMap();
        }
      );
    }
  }
  dataprofile2:any;













  populateColumnChart() {
    //console.log(this.maritalStatusCount);
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

  heatMap:any;
  populateHeatMap(){



/*
    HighCharts.setOptions({
      colors: ['#8B0000', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
     });
*/

    function getPointCategoryName(point, dimension) {
      var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
      return axis.categories[point[isY ? 'y' : 'x']];
    }

    this.heatMap = HighCharts.chart('heatmap', {

      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },


      title: {
        text: 'WPR B People w/ Diab'
      },

      xAxis: {
        categories: ['4', '5', '6', '7', '8']
      },

      yAxis: {
        categories: ['180', '160', '140', '120', '110'],
        title: null,
        reversed: true
      },



      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: HighCharts.getOptions().colors[0]
      },
      /*
          colorAxis: {
        min: -10,
        max: 7,
        endOnTick: false,
        startOnTick: false,
        tickInterval: 2,
        stops: [
            [0, '#ff0000'], //red
            [0.588, '#ffffff'], //white
            [1, '#0000ff'] //blue
        ]
    },
      */



      tooltip: {
        formatter: function () {
          return '<b>' +getPointCategoryName(this.point, 'y')+' SBP <br />' +
getPointCategoryName(this.point, 'x') +' mmo/l'+ '<br />total : '+this.point.value+'</b>';
        }
      },

      series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        type: undefined,
        data: [
          [0, 0, this.v00], [0, 1, this.v01], [0, 2, this.v02], [0, 3, this.v03],[0, 4, this.v04],
          [1, 0, this.v10], [1, 1, this.v11], [1, 2, this.v12], [1, 3, this.v13],[1, 4, this.v14],
          [2, 0, this.v20], [2, 1, this.v21], [2, 2, this.v22], [2, 3, this.v23],[2, 4, this.v24],
          [3, 0, this.v30], [3, 1, this.v31], [3, 2, this.v32], [3, 3, this.v33],[3, 4, this.v34],
          [4, 0, this.v40], [4, 1, this.v41], [4, 2, this.v42], [4, 3, this.v43],[4, 4, this.v44],

          ],
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }], credits: { enabled: false },



    });
    setTimeout(() => { this.heatMap.reflow() }, 1000);
  }



}
