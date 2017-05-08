import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';


@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

	@Input() public paper: Article;
	@Input() public index: number;
	public excludeMsg: string = "remove";
  public editing: boolean = false;
  capsToggle = false;
  formerTitle: string;
	
	public toggleMsg = function (){
  		if (!this.paper.exclude){
  			this.excludeMsg = "undo?";
  		} else {
  			this.excludeMsg = "remove";
  	}
  	}
  	


  constructor() { 
  	

  }

  ngOnInit() {
  	if (this.paper.exclude){
  		this.excludeMsg = "undo?"
  	}

  
  }

  titleCase(){
    if (!this.capsToggle){
      this.formerTitle = this.paper.title;
      this.paper.title = this.paper.title[0] + this.paper.title.substr(1).toLowerCase();
    } else {
      this.paper.title = this.formerTitle
    }
       this.capsToggle = !this.capsToggle;
    
  }


  remove(){
  	this.toggleMsg();
  	this.paper.exclude = !this.paper.exclude 
  }

  edit(val){
  	this.editing = val;
  }


}
