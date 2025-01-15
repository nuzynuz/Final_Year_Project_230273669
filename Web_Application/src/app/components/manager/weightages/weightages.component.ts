import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ManagerService } from '../manager.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Chart, registerables} from 'chart.js';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-weightages',
  templateUrl: './weightages.component.html',
  styleUrls: ['./weightages.component.scss']
})
export class WeightagesComponent implements OnInit {

  //Genarate PDF from html canvas : Ref: https://codingdiksha.com/angular-convert-html-to-pdf, https://www.youtube.com/watch?v=Eh6StPjcWjE
   
  public isProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentRoute= this.router.url;
  page = 1;
  count = 0;
  tableSize = 31;  // has to show 31 days of a month
  tableSizes = [3, 6, 9, 12];
  tbl_message='No Weightages to display';

  frmMonthYear: FormGroup;
  errorMsg='';
  current = new Date().toISOString().slice(0, 10);

  chart:any;
  chart_2:any;

  weightages=[{
    date:'',
    total_weight:'',
  }];

  years =[
   {
     year:2020
   },
   {
    year:2021
  },
  {
    year:2022
  },
  ];

  months =[
    {
      id:1,
      name:"January"
    },
    {
      id:2,
      name:"February"
   },
   {
     id:3,
    name:"March"
   },
   {
     id:4,
    name:"April"
   },
   {
     id:5,
    name:"May"
   },
   {
     id:6,
    name:"june"
   },
   {
     id:7,
    name:"July"
   },
   {
    id:8,
   name:"Augest"
  },
  {
    id:9,
   name:"Septhember"
  },
  {
    id:10,
   name:"October"
  },
  {
    id:11,
   name:"November"
  },
  {
    id:12,
   name:"December"
  },
  ];

  selectedYear=2022;
  selectedMonthId=1;
  selectedMonthName="January";
  entierMonthSum ={month_sum:''}
  
  //Table Loading
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router:Router,
    private managerService:ManagerService,
    private toaster:ToastrService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.weightages = [];//required
    this.frmMonthYear = this.formBuilder.group({
      year:new FormControl(''),
      month:new FormControl(''),
    });

    // this.chart = document.getElementById('chart_canvas');
    Chart.register(...registerables);
  //  this.loadChart();
  }

  ngAfterViewInit(): void {
    this.getWeightages(2022,1);
  }

  getWeightages(year:number, month:number): void {
    this.isLoading.next(true);
    this.tbl_message='Please be patient....';
    this.managerService.getMonthlyWeightages(year, month)
    .subscribe(
      data=>{
        this.weightages= data.daily;
        this.isLoading.next(false);
        if(data.month_sum.length>0){
          this.entierMonthSum = data.month_sum[0]
        }        
        if(data.daily.length == 0){
          this.tbl_message='No Weightages to display';
        }      
        this.loadChart_2(year, month);
      },
      err=>{
        this.isLoading.next(false);
        this.tbl_message='No Weightages to display';
        console.log(err);        
      }
    );
  }


  yearChange(){
    this.selectedYear = this.frmMonthYear.value.year;
    this.getWeightages(this.selectedYear, this.selectedMonthId);
  }

  getSelectedMonthId(id:number){
    this.selectedMonthId = id;
    let filtered = this.months.filter((o:any)=> o.id == id);

    if(filtered.length>0)
    {
      this.frmMonthYear.patchValue(
        {month:filtered[0].name}
      );
    }
    this.selectedMonthName = filtered[0].name;
    this.getWeightages(this.selectedYear, this.selectedMonthId);
  }

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getWeightages(this.selectedYear, this.selectedMonthId);
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getWeightages(this.selectedYear, this.selectedMonthId);
  } 

  openReport_01_Modal(longContent:any, _otherData:any):void {  
    this.modalService.open(longContent, { scrollable: false,size: 'lg' }); 
    this.loadChart();
  }

  closeModal():void{
     this.modalService.dismissAll();
  }

  public convertToPDF()
  {  
    //Genarate PDF from html canvas : Ref: https://codingdiksha.com/angular-convert-html-to-pdf, https://www.youtube.com/watch?v=Eh6StPjcWjE
    this.isProgress.next(true);
    let pdfName = "Tea Weightage Summation for month of " + this.selectedMonthName + "-" + this.selectedYear+".pdf";

    // html2canvas(document.body).
    html2canvas(document.getElementById('content_to_print')!).then(canvas => {
    // Few necessary setting options
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save(pdfName); // Generated PDF
    });
    this.isProgress.next(false);
  }  

  myChart:Chart;

  loadChart():void {
    let labelList = this.getLabelList(this.selectedYear, this.selectedMonthId);
    let dataList = this.getDataList(this.selectedYear, this.selectedMonthId);

    if(this.myChart!=null){
      this.myChart.destroy();
    }

    this.chart = document.getElementById('chart_canvas');
      
    this.myChart = new Chart(this.chart, {
      type: 'line',
      data: {
          labels: labelList,
          datasets: [{
              label: this.selectedYear+' - '+ this.selectedMonthName+' Tea Weightages summary',
              data: dataList,
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              tension: 0.5,
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });

    
  }

  myChart_2:Chart;
  loadChart_2(year:number, month:number):void {
  
   let labelList = this.getLabelList(year, month);
   let dataList = this.getDataList(year, month);

    if(this.myChart_2!=null){
      this.myChart_2.destroy();
    }
    this.chart_2 = document.getElementById('chart_canvas_2');
    
    let delayed: boolean;
    this.myChart_2 = new Chart(this.chart_2, {
      type: 'line',
      data: {
          labels: labelList,
          datasets: [{
              label: year+' - '+ this.selectedMonthName+' Tea Weightages summary',
              data: dataList,
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              tension: 0.4,
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }//,
          // animation: {
          //   onComplete: () => {
          //     delayed = true;
          //   },
          //   delay: (context:any) => {
          //     let delay = 0;
          //     if (context.type === 'data' && context.mode === 'default' && !delayed) {
          //       delay = context.dataIndex * 300 + context.datasetIndex * 100;
          //     }
          //     return delay;
          //   },
          // },
      }
  });
  }

  daysInMonth (month:number, year:number) {
    return new Date(year, month, 0).getDate();
  }

  getLabelList(year:number, month:number){
   let daysInMonth = this.daysInMonth(month,year); 

   let days=[];

   for(let d=1; d<= daysInMonth; d++){
    days.push(d+'');
   }
   return days;
  }

  getDataList(year:number, month:number){
   // console.log(this.weightages);
    //const day = this.weightages[0].date.split('-').pop(); // 2020
    let noOfDays = this.daysInMonth(month,year); 
    let dataList: number[]=[];
    //Fill dataList with default value 0Kg
    for(let d=1; d<= noOfDays; d++){
      dataList.push(0);
     }

    let daysInMonth = this.getLabelList(year, month);
     daysInMonth.forEach((d, index) => {
      this.weightages.forEach(w=> {
        let day = w.date.split('-').pop();
        if(d==day){
          //Update list with weightages
          dataList.splice(index, 1, parseFloat(w.total_weight));
        }
      });
    });
    return dataList;
  }
 
  
}
