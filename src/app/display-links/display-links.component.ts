import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-links',
  templateUrl: './display-links.component.html',
  styleUrls: ['./display-links.component.css']
})
export class DisplayLinksComponent implements OnInit {

	@Input() display: Object;

  constructor() { }

  ngOnInit() {
  }

}
