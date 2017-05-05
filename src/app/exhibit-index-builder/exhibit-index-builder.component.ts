import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-exhibit-index-builder',
  templateUrl: './exhibit-index-builder.component.html',
  styleUrls: ['./exhibit-index-builder.component.css']
})
export class ExhibitIndexBuilderComponent implements OnInit {

	@Input() paperList: Array<Article>;

  constructor() { }

  ngOnInit() {
  }

}
