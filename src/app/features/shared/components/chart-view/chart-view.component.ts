import { Component, OnInit, ViewChild, Input } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexPlotOptions,
  ApexGrid,
  ChartComponent
} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  title: ApexTitleSubtitle | any;
  labels: string[] | any;
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  plotOptions: ApexPlotOptions | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  categories: string[] | any
};

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

@Component({
  selector: 'chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {


  @ViewChild('chart') chart!: ChartComponent;
  @Input() chartOptions: any;


  constructor() {}

  ngOnInit(): void {
    // console.log("check chart data", this.chartOptions);
    
  }

 

}
