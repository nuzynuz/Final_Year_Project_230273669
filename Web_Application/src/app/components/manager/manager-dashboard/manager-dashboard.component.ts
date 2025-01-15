import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Chart, registerables} from 'chart.js';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private managerService:ManagerService
    ) { }
    
  currentRoute= this.router.url;

  totalOnline:number=0;
   currentYear= new Date().getFullYear(); 

  chart:any;

  usersCounts = {
    farmers: 0,
    coordinaters: 0,
    c_agents: 0,
  };

  WeightagesByYear ={
    jan:"",
    feb:"",
    march:"",
    april:"",
    may:"",
    juny:"",
    july:"",
    aug:"",
    sep:"",
    oct:"",
    nov:"",
dec:""
  };

  months =["January", "February" , "March", "April", "May", "june", "July", "Augest", "Septhember", "October","November","December"];

  ngOnInit(): void {
     Chart.register(...registerables);
     this.getUsersCount();
     this.getWeightagesByYear(this.currentYear);
  }

  ngAfterViewInit(): void {

  }

  
  getWeightagesByYear(year:number): void {

    this.managerService.getWeightagesByYear(year)
    .subscribe(
      data=>{
        this.WeightagesByYear= data; 
        this.loadChart();
      },
      err=>{
        console.log(err);        
      }
    );
  }

  getUsersCount(): void {
    this.managerService.getUsersCount()
    .subscribe(
      data=>{
        this.usersCounts= data;
      },
      err=>{
        console.log(err);        
      }
    );
  }

  getDataList(){
    let dataList=[];

    dataList.push(this.WeightagesByYear.jan);
    dataList.push(this.WeightagesByYear.feb);
    dataList.push(this.WeightagesByYear.march);
    dataList.push(this.WeightagesByYear.april);
    dataList.push(this.WeightagesByYear.may);
    dataList.push(this.WeightagesByYear.juny);
    dataList.push(this.WeightagesByYear.july);
    dataList.push(this.WeightagesByYear.aug);
    dataList.push(this.WeightagesByYear.sep);
    dataList.push(this.WeightagesByYear.oct);
    dataList.push(this.WeightagesByYear.nov);
    dataList.push(this.WeightagesByYear.dec);
    return dataList;
  }

  myChart:Chart;

  loadChart():void {
    let labelList = this.months;
    let dataList = this.getDataList();

    if(this.myChart!=null){
      this.myChart.destroy();
    }

    this.chart = document.getElementById('chart_canvas_monthly_w');
    let delayed: boolean;
    
    const myChart = new Chart(this.chart, {
      type: 'line',
      data: {
          labels: labelList,
          datasets: [{
              label: 'Tea Weightages summation in Kilogram',
              data: this.getDataList(),
              backgroundColor: "#FF6347",
              borderColor: "#FF6347",
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
          ,animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context:any) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
      }
    }); 
  }
}
