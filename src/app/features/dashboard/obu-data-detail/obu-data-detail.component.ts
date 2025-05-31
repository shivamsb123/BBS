import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-obu-data-detail',
  templateUrl: './obu-data-detail.component.html',
  styleUrls: ['./obu-data-detail.component.scss']
})
export class ObuDataDetailComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  @ViewChild('chart') chart1!: ChartComponent;

  acceleratorOptions: Partial<ChartOptions> | any;
  voltageOptions: Partial<ChartOptions> | any;
  chartOptions: Partial<ChartOptions> | any;
  motortemperature: Partial<ChartOptions> | any;

  obudata: any;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Battery';
  showYAxisLabel = true;
  yAxisLabel = 'Status Of Charges';
  timeline = true;
  doughnut = true;
  searchKeyword: any;
  obuValue: any
  obuId: any;
  chargingCount: any;
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
    location: [
      {
        latitude: 0,
        longitude: 0,
        place: '',
        vehicle: '',
        Time: '',
        last_GPS: '',
        Speed: '',
      }
    ]
  };
  tableData: any;
  mapList: any;
  leaveRequest: { name: string; value: any; }[];
  
  view: any = [425, 200];
  legend: boolean = true;

  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  customColors:any

  milage: any = [];
  showLabels: boolean = true;
  SOCData:any = [];
  batterytempData:any = []
  batterytempxLabel = 'Battery';
  batterytempyLabel = 'Battery Temperature';
  single:any



  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {

    

    /**
     * DC/DC Status chartoption
     */
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "EV",
    //       data: [44]
    //     },
    //     {
    //       name: "Plug-in hybrid",
    //       data: [13]
    //     },
    //     {
    //       name: "Hybrid ex plug-in",
    //       data: [90]
    //     },
    //     {
    //       name: "Battery  ",
    //       data: []
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 200,
    //     fontFamily: "Montserrat, sans-serif",
    //     stacked: true,
    //     toolbar: {
    //       show: true
    //     },
    //     zoom: {
    //       enabled: true
    //     }
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         legend: {
    //           position: "bottom",
    //           offsetX: -10,
    //           offsetY: 0
    //         }
    //       }
    //     }
    //   ],
    //   plotOptions: {
    //     bar: {
    //       horizontal: false
    //     }
    //   },
    //   xaxis: {
    //     type: "category",
    //     categories: [
    //       "0",
    //       "30",
    //       "90",
    //       "12",
    //     ]
    //   },
    //   // legend: {
    //   //   position: "right",
    //   //   offsetY: 40
    //   // },
    //   fill: {
    //     opacity: 1
    //   }
    // };


  }

  ngOnInit() {
    this.obuId = this.route.snapshot.paramMap.get("id");
    if (this.obuId) {
      this.obuValue = this.location.getState();
      console.log("check obu", this.obuValue);
      
      this.getOBUData()
    }
  }

  getOBUData() {
    this.milage = [
      {
        "name": "Km",
        "value": parseInt(this.obuValue?.mileage)
      },
    ];

    this.single =[
      {
        "name": "km/h",
        "value": this.obuValue?.speed
      }
    ];


    this.batterytempData = [
      {
        "name": "Battery 1",
        "value": this.obuValue?.battery1Temp
      },
      {
        "name": "Battery 2",
        "value": this.obuValue?.battery2Temp
      },
      {
        "name": "Battery 3",
        "value": this.obuValue?.battery3Temp
      },
      {
        "name": "Battery 4",
        "value": this.obuValue?.battery4Temp
      },
      {
        "name": "Battery 5",
        "value": this.obuValue?.battery5Temp
      },
      {
        "name": "Battery 6",
        "value": this.obuValue?.battery6Temp
      },
      {
        "name": "Battery 7",
        "value": this.obuValue?.battery7Temp
      },
      {
        "name": "Battery 8",
        "value": this.obuValue?.battery8Temp
      },
    ]

  

    /**
     * Accelerator chartoption
     */
    this.acceleratorOptions = {
      series: [this.obuValue?.acceleratorPedal],
      chart: {
        height: 250,
        type: "radialBar",
        offsetY: -10,
        fontFamily: "Montserrat, sans-serif",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "13px",
              color: undefined,
              offsetY: 10
            },
            value: {
              offsetY: 10,
              fontSize: "13px",
              color: undefined,
              formatter: function (val: string) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: [""]
    };

     /**
     * Motor Controller Temp. chartoption
     */
     this.voltageOptions = {
      series: [this.obuValue?.soc],
      chart: {
        height: 300,
        type: "radialBar",
        offsetY: -10,
        fontFamily: "Montserrat, sans-serif",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "13px",
              color: undefined,
              offsetY: 10
            },
            value: {
              offsetY: 10,
              fontSize: "13px",
              color: undefined,
              formatter: function (val: string) {
                return val + '%';
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["SOC"]
    };

    this.motortemperature = {
      series: [
        {
          name: "Minimum Bettery Temp.",
          data: [this.obuValue?.minBatteryTemp]
        },
        {
          name: "Minimum Battery Vol.",
          data: [this.obuValue?.minBatteryVoltage]
        },
        {
          name: "Max Battery Temp.",
          data: [this.obuValue?.maxBatteryTemp]
        },
        {
          name: "Max Battery Vol.",
          data: [this.obuValue?.maxBatteryVoltage]
        }
      ],
      chart: {
        type: "bar",
        height: 200,
        fontFamily: "Montserrat, sans-serif"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "1",
        ]
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val;
          }
        }
      }
    };
  }


  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}
