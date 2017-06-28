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



	public model: Article = new Article("", "", 0, 0, false, false, "");

  constructor() { }

  ngOnInit() {
    if (this.paper){
      this.model = this.paper;
    }
    
  }

//for adding papers to the paperList not represented by GS profile
// also edits existing papers based on value of this.mode
  submit(){
    if (this.mode){
      let paper = new Article(this.model.title, this.model.journal, this.model.citations, this.model.year, false, this.model.firstAuthor);
      this.paperList.unshift(paper);
      this.model = new Article("", "", 0, 0, false, false);
    } else {
 	    this.paper = new Article(this.model.title, this.model.journal, this.model.citations, this.model.year, false, this.model.firstAuthor);
      this.edited.emit(false);
    }

  }

  updateRadio(){
     this.model.firstAuthor ? this.model.firstAuthor = false : this.model.firstAuthor = true
       }



}
