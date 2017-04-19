import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from '../article';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.css']
})
export class AddPaperComponent implements OnInit {

	@Input() public paperList: Article[];
  @Input() public mode: boolean
  @Input() public paper: Article;
  @Output() edited = new EventEmitter();



	public model: Article = new Article("", "", 0, 0, false);

  constructor() { }

  ngOnInit() {
    if (this.paper){
      this.model = this.paper;
    }
    
  }


  submit(){
    console.log(this.mode)
    if (this.mode){
      let paper = new Article(this.model.title, this.model.journal, this.model.citations, this.model.year, false);
      this.paperList.unshift(paper);
      this.model = new Article("", "", 0, 0, false);
    } else {
 	    this.paper = new Article(this.model.title, this.model.journal, this.model.citations, this.model.year, false);
      this.edited.emit(false);
    }

  }



}
