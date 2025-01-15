import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CoordinatorService } from '../coordinator.service';

@Component({
  selector: 'app-advance-list',
  templateUrl: './advance-list.component.html',
  styleUrls: ['./advance-list.component.scss']
})
export class AdvanceListComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  currentRoute= this.router.url;
  newRequest:number=0;
  currentUser:any;

  myRegion:{
    id:'',
    name:''
  };

  advanceList=[
    {
      id:'',
      reqestedAmount:'',
      comment:'',
      acceptedAmount:'',
      status:'',
      remarks:'',
      createdAt:'',
      updatedAt:'',
      farmerId:'',
      farmer: {
        id: '',
        supplierCode: '',
        RFID: '',
        createdAt: '',
        updatedAt: '',
        userProfileId: '',
        coordinatorId: '',
        collectingAgentId: '',
        collectingRegionId: ''
    }
  }
  ]
  advanceListSource=[
    {
      id:'',
      reqestedAmount:'',
      comment:'',
      acceptedAmount:'',
      status:'',
      remarks:'',
      createdAt:'',
      updatedAt:'',
      farmerId:'',
      farmer: {
        id: '',
        supplierCode: '',
        RFID: '',
        createdAt: '',
        updatedAt: '',
        userProfileId: '',
        coordinatorId: '',
        collectingAgentId: '',
        collectingRegionId: ''
    }
  }
  ]

  tbl_message='No Request submited so far';

    //Table Loading
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    //Form Submit
    public isProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  constructor(
    private router:Router,
    private coordinatorService:CoordinatorService,
  ) { }

  ngOnInit(): void {
  
    this.advanceList=[];
    this.currentUser =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }
  ngAfterViewInit() {
    this.getMyRegionId();    
  }

  getMyRegionId():void{
    this.coordinatorService.getMyRegionId(this.currentUser.id)
    .subscribe(
      (data:any)=>{ 
        this.myRegion= data.region;
        this.getAdvanceList();
      },
      (err:any)=>{
        console.log(err);        
      }
    );
  }

  getAdvanceList():void{
    this.isLoading.next(true);
    this.tbl_message='Please be patient....';
    this.coordinatorService.getAdvanceReq(this.myRegion.id)
    .subscribe(
      (data:any)=>{
        this.advanceListSource= data.data;
        this.advanceList = this.advanceListSource.slice();
        this.isLoading.next(false);
        if(this.advanceList.length==0){
          this.tbl_message='No Request submited so far';
        }else{
          this.tbl_message='';
        }       
        this.advanceListSource.map((item:any)=> item.status==='pending'?this.newRequest++:0)   
      },
      (err:any)=>{
        this.isLoading.next(false);
        this.tbl_message='No data so far.';
        console.log(err);      
      }
    );
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getAdvanceList();
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAdvanceList();
  }

  getStatusBatch(status:string):string {
    let cssClass='';
    switch(status){
     case 'accepted':cssClass='badge badge-success';
       break;
     case 'denied':cssClass='badge badge-danger';
       break;
     case 'pending':cssClass='badge badge-warning';
       break;
    }
   return cssClass;
  }

 openActionModal():void {
 }

 applyUsersFilter(filterValue: string):void {
  filterValue = filterValue.trim(); // Remove whitespace
  if(filterValue.length===0)
  this.advanceList= this.advanceListSource.slice();
  else
  this.advanceList= this.advanceListSource.filter(O=> O.farmer.supplierCode.includes(filterValue) || O.status.includes(filterValue));
 }
}
