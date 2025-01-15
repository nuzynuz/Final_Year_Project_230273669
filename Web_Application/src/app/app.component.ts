import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  totalCount = 0;
  calCount(count:number){
    this.totalCount = this.totalCount + count;
  }

  //sample data for datalist component
  data1 = [{
    name : 'Sam Johnson',
    dept : 'Electrical'
  },{
    name : 'Roy Thomas',
    dept : 'Mechanical'
  },{
    name : 'Jim Lasker',
    dept : 'Medical'
  }];

  data2 = [{
    name : 'Johnson',
    dept : 'Physics'
  },{
    name : 'Thomas',
    dept : 'Chemistry'
  },{
    name : 'Lasker',
    dept : 'Biology'
  }];
}
