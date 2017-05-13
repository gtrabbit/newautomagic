import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	accessDenied = false;

  constructor() { }

  ngOnInit() {

  }

  showAdminPanel(){
  	this.accessDenied = !this.accessDenied
  }

}
