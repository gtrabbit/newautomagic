import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

	@Output() closed = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  close(){
  	this.closed.emit();
  }

}
