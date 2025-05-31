import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
//   series: ApexAxisChartSeries | any;
//   chart: ApexChart | any;
//   xaxis: ApexXAxis | any;
//   yaxis: ApexYAxis | ApexYAxis[] | any;
//   title: ApexTitleSubtitle | any;
//   labels: string[] | any;
//   stroke: any; // ApexStroke;
//   dataLabels: any; // ApexDataLabels;
//   fill: ApexFill | any;
//   tooltip: ApexTooltip | any;
//   responsive: ApexResponsive[] | any;
//   plotOptions: ApexPlotOptions | any;
//   grid: ApexGrid | any;
//   annotations: ApexAnnotations | any;
//   colors: any;
//   toolbar: any;
//   legend: ApexLegend;
// };

// @Component({
//   selector: 'tyre-details',
//   templateUrl: './tyre-details.component.html',
//   styleUrls: ['./tyre-details.component.scss']
// })
// export class TyreDetailsComponent {
//   @Input() modalRef: any
//   @Input() type: string | any
//   @ViewChild("chart") chart!: ChartComponent;
//   chartOptions!: Partial<ChartOptions>;
//   tyreLifeOption!: Partial<ChartOptions>;
//   tyreTimeOptions!: Partial<ChartOptions>;

//   constructor() {
//     this.chartOptions = {
//       series: [
//         {
//           name: "Tyre Pressure",
//           data: [30, 35, 38, 40, 40, 39]
//         }
//       ],
//       chart: {
//         type: "bar",
//         height: 250,
//         fontFamily:"Montserrat, sans-serif",
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "55%",
//           endingShape: "rounded"
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ["transparent"]
//       },
//       xaxis: {
//         categories: [
//           "Tyre 1",
//           "Tyre 2",
//           "Tyre 3",
//           "Tyre 4",
//           "Tyre 5",
//           "Tyre 6",
//         ]
//       },
//       yaxis: {
//         title: {
//           text: "Tyre Pressure"
//         }
//       },
//       fill: {
//         opacity: 1
//       },
//       tooltip: {
//         y: {
//           formatter: function(val: string) {
//             return + val;
//           }
//         }
//       }
//     };

//     this.tyreLifeOption = {
//       series: [90],
//       chart: {
//         height: 220,
//         type: "radialBar",
//         offsetY: -10,
//         fontFamily:"Montserrat, sans-serif",
//       },
//       plotOptions: {
//         radialBar: {
//           startAngle: -135,
//           endAngle: 135,
//           dataLabels: {
//             name: {
//               fontSize: "16px",
//               color: undefined,
//               offsetY: 120
//             },
//             value: {
//               offsetY: 76,
//               fontSize: "22px",
//               color: undefined,
//               formatter: function(val: string) {
//                 return val + "%";
//               }
//             }
//           }
//         }
//       },
//       fill: {
//         type: "gradient",
//         gradient: {
//           shade: "dark",
//           shadeIntensity: 0.15,
//           inverseColors: false,
//           opacityFrom: 1,
//           opacityTo: 1,
//           stops: [0, 50, 65, 91]
//         }
//       },
//       stroke: {
//         dashArray: 4
//       },
//       labels: ["Tyre's Life"]
//     };

//     this.tyreTimeOptions = {
//       chart: {
//         height: 250,
//         type: "radialBar",
//         fontFamily:"Montserrat, sans-serif",
//         dropShadow: {
//           enabled: true,
//           enabledSeries: undefined,
//           top: 5,
//           left: 2,
//           blur: 10,
//           opacity: 0.25
//         }
//       },
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             margin: 0,
//             size: "80%",
//             background: "#fff",
//             position: "front"
//           },
//           track: {
//             background: "#e7e7e7",
//             strokeWidth: "97%",
//             margin: 5, // margin is in pixels
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5
//             }
//           },
    
//           dataLabels: {
//             showOn: "always",
//             name: {
//               offsetY: -20,
//               show: true,
//               color: "#888",
//               fontSize: "13px"
//             },
//             value: {
//               formatter: function(val:any) {
//                 return 85 + ' %';
//               },
//               color: "#111",
//               fontSize: "30px",
//               show: true
//             }
//           }
//         }
//       },
    
//       series: [74],
//       stroke: {
//         lineCap: "round"
//       },
//       labels: [""]
//     };
//    }

//   ngOnInit(): void {
//   }
}
