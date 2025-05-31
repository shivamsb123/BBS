

import * as moment from 'moment';
import { Component, Input, ViewChild } from "@angular/core";



@Component({
  selector: 'speed-graph',
  templateUrl: './speed-graph.component.html',
  styleUrls: ['./speed-graph.component.scss']
})
export class SpeedGraphComponent {
  @Input() multi: any[];
  @Input() type:any

  view: any = [1466, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Speed';
  timeline: boolean = true;

  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  data: any[];

  constructor() {
    
  }


   formatDate(dateString) {
    const date = moment(dateString, 'DD/MM/YYYY h:mm:ss A');
    return date.format('MMM DD YYYY');
  }


  ngOnInit(){
    console.log("check type", this.type, this.multi) ;
    // if(this.type == 'Graphvalue') {

    //   this.data = this.multi?.map(group => {
    //     group.series = group.series.map(dataItem => {
    //       console.log("chekc date------", dataItem);
          
    //     })
    //     return group;
    //   })
    // }
  }
 
}
