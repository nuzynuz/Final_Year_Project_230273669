import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss'],
})
export class DatalistComponent implements OnInit {

@Input() data:any;
@Input() showCount = false;
@Output() calCount= new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.calCount.emit(this.data.length);
  }
  
}
