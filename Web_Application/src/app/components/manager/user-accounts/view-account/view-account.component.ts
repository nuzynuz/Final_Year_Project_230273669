import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Loader } from '@googlemaps/js-api-loader';
import { ManagerService } from '../../manager.service';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  userId:any;
  user:User;

  constructor(
    private route: ActivatedRoute,
    private managerService:ManagerService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser(parseInt(this.userId));

    // const mapDiv = document.getElementById("google_map") as HTMLElement;

    // let loader = new Loader({
    //   apiKey:'AIzaSyA1tAVl3aAjpOse5f7DdaD1iFAf6R3mZbo'
    // })
    // loader.load().then(()=>{
    //   new google.maps.Map(mapDiv,{
    //     center:{lat: 51.233334, lng:6.78333},
    //     zoom:6
    //   })
    // })
  }

  ngAfterViewInit(){
   
  }

  getUser(id:number):void{
    
    this.managerService.getUser(id).subscribe(
      (data:any)=>{
        this.user= data;
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

}

export interface User {
  id: number,
  firstName:string,
  middleName:string,
  lastName:string,
  address:string,
  contact:string,
  createdAt:string,
  updatedAt:string,
  loginId:number,
  login: {
      id: number,
      name: string,
      email: string,
      role: string,
      lastLogin:string,
      avatar: string,
      status:string,
  }
}
