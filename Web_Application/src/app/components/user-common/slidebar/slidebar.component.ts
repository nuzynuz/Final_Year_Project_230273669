import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {

@Input() navigations :any;

  constructor() { }

  ngOnInit(): void {
  }

}
