import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoordinatorService } from '../coordinator.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { map, startWith } from 'rxjs/internal/operators';
import { ManagerService } from '../../manager/manager.service';
@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  currentRoute= this.router.url;
  totalOnline:number=0;

  //Dropdown selected values
  selectedRegionId:any =0;
  selectedAgentId:any =0;
  selectedCoordinatorId:any =0;

  agentsWarningLabel:string ="";
  coordnatorsWarningLabel:string ="";

  usersSource=[{
    id:'',
    userProfile:{
      id: '',
            firstName: '',
            middleName: '',
            lastName: '',
            address: '',
            contact: '',
            loginId: '',
            login: {
                id:'',
                name:'',
                email: '',
                role: '',
                lastLogin: '',
                avatar: '',
                status: '',
            }
    }
  }];

  users=[{
    id:'',
    userProfile:{
            id: '',
            firstName: '',
            middleName: '',
            lastName: '',
            address: '',
            contact: '',
            loginId: '',
            login: {
                id:'',
                name:'',
                email: '',
                role: '',
                lastLogin: '',
                avatar: '',
                status: '',
            }
    }
  }];

  currentUser:any;

  collectingRegion:string;
  closeResult: string;//Modal close Result

  frmUserProfile: FormGroup;
  frmLogin: FormGroup;
  hide = true; //Password field
  tbl_message='No Users';
  errorMsg='';
  isFarmer=false;

  modalReference: any;

  //Table Loading
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //Form Submit
  public isProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //Drop downs
  regions: Region[];
  filteredOptions: Observable<Region[]>;

  agents:any;
  coordinators:any;
  
  constructor(
    private router:Router,
    private managerService:ManagerService,
    private coordinatorService:CoordinatorService,
    private modalService: NgbModal,
    private toaster:ToastrService,
    private formBuilder:FormBuilder,
    private userService:UserService
    ) { 
      
    }

  ngOnInit(): void {
    this.users = [];//required
    this.frmUserProfile = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      middleName:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      lastName:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      address:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      contact:new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      collectingAgentId:new FormControl(''),
      coordinatorId:new FormControl(''),
      collectingRegionId:new FormControl('',[Validators.required])
    });

    this.frmLogin= new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      avatar:new FormControl('')
    });

    this.filteredOptions = this.frmUserProfile.controls.collectingRegionId.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.currentUser =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }

  ngAfterViewInit() {
    this.getUsers();
    this.getCol_Regions();
   
  }

  private _filter(value: string): Region[] {
    const filterValue = value.toLowerCase();
   if(filterValue){
    return this.regions.filter(regions => regions.name.toLowerCase().includes(filterValue));
   }
   return this.regions;
  }

  getCol_Regions():void{
    this.managerService.getAll_Col_Regions()
    .subscribe(
      (data:any)=>{
        this.regions= data;
      },
      (err:any)=>{
        console.log(err);        
      }
    );
  }
  
  getUsers():void{
    this.isLoading.next(true);
    this.tbl_message='Please be patient....';
    this.coordinatorService.getUsers(this.currentUser.id,'cagent')
    .subscribe(
      data=>{
        this.usersSource=data.usersList;
        this.collectingRegion = data.collectingRegion;
        this.users= this.usersSource.slice();
        this.usersSource.map((u: any)=>u.status==='online'?this.totalOnline++:0);
        this.isLoading.next(false);
        this.tbl_message='No Users';
      },
      err=>{
        this.isLoading.next(false);
        this.tbl_message='No Users';
        console.log(err);        
      }
    );
  }

  applyUsersFilter(filterValue: string):void {
    filterValue = filterValue.trim(); // Remove whitespace
    if(filterValue.length===0)
    this.users= this.usersSource.slice();
    else
    this.users= this.usersSource.filter(O=> O.userProfile.login.name.includes(filterValue) || O.userProfile.login.email.includes(filterValue));
  }

  getStatusBatch(status:string):string {
    let cssClass='';
    switch(status){
     case 'online':cssClass='badge badge-success';
       break;
     case 'offline':cssClass='badge badge-danger';
       break;
    }
   return cssClass;
 }

 
  //Add new users
  clicksub(stepper: MatStepper): void {
    const login = this.frmLogin.value;
    let  userProfile = {
      firstName : this.frmUserProfile.value.firstName,
      middleName : this.frmUserProfile.value.middleName,
      lastName : this.frmUserProfile.value.lastName,
      address : this.frmUserProfile.value.address,
      contact : this.frmUserProfile.value.contact,
      rfid : this.frmUserProfile.value.rfid,
      collectingAgentId : this.selectedAgentId,
      coordinatorId : this.selectedCoordinatorId,
      collectingRegionId : this.selectedRegionId
    }
  
    const profile = userProfile;
    this.isProgress.next(true);
   
     this.userService
     .userSignup(profile ,login)
     .subscribe(
       data=>{
         this.toaster.info('Account info has been sent', 'Email sent!');
         this.errorMsg='';
         this.isProgress.next(false);
         stepper.next();
         this.frmLogin.reset();
         this.frmUserProfile.reset();
         this.getUsers();
         setTimeout(()=>{this.closeModal()},2000)      
       },
       error=>{
         console.log(error);
         this.isProgress.next(false);
         this.errorMsg=error.error.error;        
       }
       )
   }
 
   open(content:any) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }
 
   openUserModal(longContent:any, _otherData:any):void {
     // this.otherData = _otherData;
      this.modalService.open(longContent, { scrollable: false,size: 'lg' }); 
   }
 
   closeModal():void{
     this.modalService.dismissAll();
   }
 
   goForward(stepper: MatStepper, role:string){
    this.frmLogin.patchValue({
     role: role
   });
    this.isFarmer = role==='farmer'? true:false;
     stepper.next();
   }
 
   get fPersonal() {
     return this.frmUserProfile.controls;
   }
   get fAccCredential() {
     return this.frmLogin.controls;
   }
 

   getSelectedRegionId(id:any):void
   {
     if(!this.isFarmer){
       this.frmUserProfile.patchValue(
         {
           coordinatorId:'0',
           collectingAgentId:'0',
           rfid:'temp_temp'
        },
       );
     }
 
     //Get agents and coordinators
     this.managerService.getByRegion('c-agent', id).subscribe(
       (data:any)=>{
         this.agents = data.agents;
         this.coordinators = data.coordinators;
 
         if(data.agents.length==0) this.agentsWarningLabel ="Agents not found in selected Region";
         else   this.agentsWarningLabel =data.agents.length+  " Agents available";
         
         if(data.coordinators.length==0) this.coordnatorsWarningLabel ="Coordnators not found in selected Region";
         else this.coordnatorsWarningLabel =data.coordinators.length+  " Coordnators available";
       },
       (error:any)=>{
         console.log(error);
       }
     );
 
     //Display selected region on dropdown
     this.selectedRegionId = id;
     let regions = this.regions.filter((o:any)=> o.id ==id);
 
     if(regions.length>0)
     {
       this.frmUserProfile.patchValue(
         {collectingRegionId:regions[0].name}
       );
     }
   }
 
    
   getSelectedAgentId(id:any):void{
     this.selectedAgentId = id;
 
     let agents_filter = this.agents.filter((o:any)=> o.id ==id);
 
     if(agents_filter.length>0)
       {
         this.frmUserProfile.patchValue(
           {collectingAgentId:agents_filter[0].userProfile.firstName}
         );
       }
   }
 
   getSelectedCordinatorId(id:any):void{
     this.selectedCoordinatorId = id;
    
     let coord_filter = this.coordinators.filter((o:any)=> o.id ==id);
 
     if(coord_filter.length>0)
       {
         this.frmUserProfile.patchValue(
           {coordinatorId:coord_filter[0].userProfile.firstName}
         );
       }
   }

   onTableDataChange(event:any){
    this.page = event;
    this.getUsers();
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUsers();
  }
}

export interface Region{
  id:number,
  name:string
}
