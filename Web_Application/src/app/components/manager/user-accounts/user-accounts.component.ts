import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelect } from '@angular/material/select';
import { map, startWith } from 'rxjs/internal/operators';

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: "",
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

export interface Region{
  id:number,
  name:string
}

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserAccountsComponent implements OnInit {

  //ng-bootstrap pagiantion
  // page = 1;
  // pageSize =7;

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
    status:'',
    id:'',
    name:'',
    role:'',
    email:''
  }];
  users=[{
    status:'',
    id:'',
    name:'',
    role:'',
    email:''
  }];

  closeResult: string;//Modal close Result

  frmUserProfile: FormGroup;
  frmLogin: FormGroup;
  hide = true; //Password field
  tbl_message='No Users';
  errorMsg='';
  rfid_msg='';
  isFarmer=false;
  rfidBtnClass='pe-7s-magic-wand';
  
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<PeriodicElement>;

  //dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
    this.getCol_Regions();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  applyUsersFilter(filterValue: string):void {
    filterValue = filterValue.trim(); // Remove whitespace
    if(filterValue.length===0)
    this.users= this.usersSource.slice();
    else
    this.users= this.usersSource.filter(O=> O.name.includes(filterValue) || O.email.includes(filterValue));
  }

  modalReference: any;

  //Table Loading
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //Form Submit
  public isProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //Drop downs
  regions: Region[];
  filteredOptions: Observable<Region[]>;

  agents:any =[];
  coordinators:any = [];

  constructor(
    private router:Router,
    private managerService:ManagerService,
    private modalService: NgbModal,
    private toaster:ToastrService,
    private formBuilder:FormBuilder,
    private userService:UserService
    ) { 
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }

  ngOnInit(): void {
    this.users = [];//required
    this.frmUserProfile = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      middleName:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      lastName:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      address:new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(2)]),
      contact:new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      rfid:new FormControl('',[Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
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
  }
  
  private _filter(value: string): Region[] {
    let filterValue = value;
   if(filterValue!=null)
   filterValue=filterValue.toString().toLowerCase();
   if(filterValue){
    return this.regions.filter(regions => regions.name.toLowerCase().includes(filterValue));
   }
   return this.regions;
  }
  
  getCol_Regions():void{
    this.managerService.getAll_Col_Regions()
    .subscribe(
      data=>{
        this.regions= data;
      },
      err=>{
        console.log(err);        
      }
    );
  }

  getUsers():void{
    this.isLoading.next(true);
    this.tbl_message='Please be patient....';
    this.managerService.getUserAccounts()
    .subscribe(
      data=>{
        this.usersSource= data;
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

  //Add new user
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
        this.resetForms();
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

  resetForms():void{
    this.frmLogin.reset();
    this.frmUserProfile.reset();
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
  
  readRFID():void{
    let url='http://192.168.4.1/rfid'; //Node MCU's web server's url
    window.open(url.toString(), "_blank", "resizable=yes, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=30 top=100 " );
    
  }

  checkAvailability(){
     if(this.frmUserProfile.value.rfid.length > 8){
      this.userService.user_rfid_available(this.frmUserProfile.value.rfid).subscribe(
        data=>{
          this.rfid_msg= data.avalilable =="no"? 'This Id is already used':'';
          this.rfidBtnClass=data.avalilable =="yes"? 'pe-7s-ticket text-success':'pe-7s-ticket text-danger';
          if(data.avalilable =="no"){
            this.frmUserProfile.controls['rfid'].setErrors({'incorrect': true});
          }else{
            this.frmUserProfile.controls['rfid'].setErrors(null);
          }
        },
        err=>{
          this.rfid_msg="Try again!";
          this.rfid_msg='';
          this.rfidBtnClass="pe-7s-magic-wand text-danger";
          console.log(err);
        }
     )
     }else{
       this.rfidBtnClass="pe-7s-magic-wand text-danger";
       this.rfid_msg='';
     }    
  }

  get fPersonal() {
    return this.frmUserProfile.controls;
  }
  get fAccCredential() {
    return this.frmLogin.controls;
  }

  // populate agents and coordinator drop down according to Selected RegionId
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


