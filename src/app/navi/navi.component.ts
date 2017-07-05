import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{

	@Input() state: number;
	@Output() stateChange = new EventEmitter();
	locations = ["Confirm Papers", "Confirm Journals", "Retrieve Rankings", "Find Top Cited"]

  constructor() { }

  ngOnInit() {

  }

  navigate(i){
      this.stateChange.emit(i);  	
  }



}
