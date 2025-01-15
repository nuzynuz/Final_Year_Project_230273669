import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.component.html',
  styleUrls: ['./coordinator-dashboard.component.scss']
})
export class CoordinatorDashboardComponent implements OnInit {

  constructor(private router:Router) { }
  currentRoute= this.router.url;

  ngOnInit(): void {
  }

}
