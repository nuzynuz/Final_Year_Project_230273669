import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ManagerService } from '../manager.service';
import { ToastrService } from 'ngx-toastr';
import {Chart, registerables} from 'chart.js';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {

  currentRoute= this.router.url;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  tbl_message='No Regions to display';

  current = new Date().toISOString().slice(0, 10);

  errorMsg='';

  regions=[{
    name:'',
    description:'',
    createdAt:'',
    updatedAt:'',
  }];

  farmersCounts=[
    {
      collectingRegionId: 0,
      name: "",
      farmers_count: ""
    }
  ];

  frmRegions: FormGroup;

  chart:any;
  chart_in_report:any;
  months =["January", "February" , "March", "April", "May", "june", "July", "Augest", "Septhember", "October","November","December"];

  //Table Loading
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //Form Submit
  public isProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router:Router,
    private modalService: NgbModal,
    private managerService:ManagerService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.regions = [];//required
    this.frmRegions = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)])
    });    
  }
  
  ngAfterViewInit(): void {
    this.getRegions();
    this.getFarmers_count_by_regions();
    this.loadChart();
  }

  resetForm(): void{
    this.frmRegions.reset();
  }

  getRegions(): void {
    this.isLoading.next(true);
    this.tbl_message='Please be patient....';
    this.managerService.getAll_Col_Regions()
    .subscribe(
      data=>{
        this.regions= data;
        this.isLoading.next(false);
        this.tbl_message='No Regions to display';
      },
      err=>{
        this.isLoading.next(false);
        this.tbl_message='No Regions to display';
        console.log(err);        
      }
    );
  }

  getFarmers_count_by_regions():void{
    this.managerService.getFarmers_count_by_regions()
    .subscribe(
      data=>{
        this.farmersCounts= data;
        if(this.farmersCounts.length>0)  this.loadChart();        
      },
      err=>{
        console.log(err);        
      }
    );
  }

   //Add new region
  clicksub(stepper: MatStepper): void {
    const region = this.frmRegions.value;
    this.isProgress.next(true);
     this.managerService
     .saveRegion(region)
     .subscribe(
       data=>{
         this.toaster.info('Account info has been sent', 'Email sent!');
         this.errorMsg='';
         this.isProgress.next(false);
         stepper.next();
         this.frmRegions.reset();
         this.getRegions();
         setTimeout(()=>{this.closeModal()},2000)      
       },
       error=>{
         console.log(error);
         this.isProgress.next(false);
         this.errorMsg=error.error.error;        
       }
       )
  }

  openRegionModel(longContent:any, _otherData:any):void {
     this.modalService.open(longContent, { scrollable: false,size: 'lg' }); 
  }

  openReport_01_Modal(longContent:any, _otherData:any):void {  
    this.modalService.open(longContent, { scrollable: false,size: 'lg' }); 
    this.loadReportChart();
  }

  public convertToPDF()
  {  
    //Genarate PDF from html canvas : Ref: https://codingdiksha.com/angular-convert-html-to-pdf, https://www.youtube.com/watch?v=Eh6StPjcWjE
    this.isProgress.next(true);
    let pdfName = "report_of_tea_suppliers_by_regions.pdf";

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

  closeModal():void{
      this.modalService.dismissAll();
  }

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRegions();
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getRegions();
  }  

  myChart:Chart;

  loadChart():void {

    if(this.myChart!=null){
      this.myChart.destroy();
    }

    this.chart = document.getElementById('chart_canvas_1');
    let delayed: boolean;
    
     this.myChart = new Chart(this.chart, {
      type: 'polarArea',
      data: {
          labels: this.getLabelList(),
          datasets: [{
              label: 'TEA SUPPLIERS/FARMERS COUNT BY REGION',
              data: this.getDataList(),
              backgroundColor: this.getColorList(),
              // borderColor: "#FF6347",
              borderWidth: 2
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tea Suppliers/Farmers Count by region'
          }
        },
        animation: {
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

  reportChart:Chart;

  loadReportChart():void {
        
    if(this.reportChart!=null){
      this.reportChart.destroy();
    }

    this.chart_in_report = document.getElementById('report_chart_canvas');
    
     this.reportChart = new Chart(this.chart_in_report, {
      type: 'polarArea',
      data: {
          labels: this.getLabelList(),
          datasets: [{
              label: 'TEA SUPPLIERS/FARMERS COUNT BY REGION',
              data: this.getDataList(),
              backgroundColor: this.getColorList(),
              // borderColor: "#FF6347",
              borderWidth: 2
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tea Suppliers/Farmers Count by region'
          }
        }
      }
    }); 
  }
 
  getDataList(){
    let dataList :number[]=[];
    this.farmersCounts.forEach(element=>{
      dataList.push(parseInt(element.farmers_count));
    });
    return dataList;
  }

  getLabelList(){
    let labelList :string[]=[];
    this.farmersCounts.forEach(element=>{
      labelList.push(element.name);
    });
    return labelList;
  }

  getColorList(){
    let colorList :string[]=[];
    this.farmersCounts.forEach(element=>{
      colorList.push(this.getRandomColor());
    });
    return colorList;
  }
  
   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
