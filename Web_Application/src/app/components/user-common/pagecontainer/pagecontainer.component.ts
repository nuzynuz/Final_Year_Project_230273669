import {
  Component,
  OnInit
} from '@angular/core';

import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-pagecontainer',
  templateUrl: './pagecontainer.component.html',
  styleUrls: ['./pagecontainer.component.scss']
})
export class PagecontainerComponent implements OnInit {

  user_role: string;
  user: any;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  managerNavigations =[
    {
      header:'Dashboards',
      pages:[
        { 
          link:'/manager/dashboard',
          name:'Manager Dashboard',
          icon:'metismenu-icon pe-7s-home',
          iconColor:'Tomato'
        }
      ]
    },
    {
      header:'Users',
      pages:[
        { 
          link:'/manager/user-accounts',
          name:'Accounts',
          icon:'metismenu-icon pe-7s-user',
          iconColor:'Tomato'
        }
      ]
    },
    {
      header:'Areas',
      pages:[
        { 
          link:'/manager/regions',
          name:'Regions',
          icon:'metismenu-icon pe-7s-map-marker',
          iconColor:'Tomato'
        }
      ]
    },
    {
      header:'Weightages',
      pages:[
        { 
          link:'/manager/weightages',
          name:'Weightages',
          icon:'metismenu-icon pe-7s-timer',
          iconColor:'Tomato'
        }
      ]
    },
  ]

  coordinatorNavigations =[
    {
      header:'Dashboards',
      pages:[
        { 
          link:'/coordinator/dashboard',
          name:'Coordinator Dashboard',
          icon:'metismenu-icon pe-7s-home',
          iconColor:'Tomato'
        }
      ]
    },
    {
      header:'Users',
      pages:[
        { 
          link:'/coordinator/farmers',
          name:'Farmers',
          icon:'metismenu-icon pe-7s-user',
          iconColor:'Tomato'
        },
        { 
          link:'/coordinator/agents',
          name:'Agents',
          icon:'metismenu-icon pe-7s-user',
          iconColor:'Tomato'
        }
      ]
    },
    {
      header:'Inquiries',
      pages:[
        { 
          link:'/coordinator/advances',
          name:'Advance Requests',
          icon:'metismenu-icon pe-7s-cash',
          iconColor:'Tomato'
        }
      ]
    },
  ]

  webmasterNavigations=[];

  farmerNavigations=[];

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = sessionStorage.getItem('auth-user');
      var obj2 = JSON.parse(this.user);
      this.user_role = obj2.role;
    }
  }
}
