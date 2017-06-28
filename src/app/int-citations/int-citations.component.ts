import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { GetCitingPapersService } from '../get-citing-papers.service'

@Component({
  selector: 'app-int-citations',
  templateUrl: './int-citations.component.html',
  styleUrls: ['./int-citations.component.css'],
  providers: [GetCitingPapersService]
})
export class IntCitationsComponent implements OnInit {

	@Input() paper: Article;
	something = [];
  regExp = /cites=(\d+)/;

  constructor(private GCPS: GetCitingPapersService) { }

  ngOnInit() {
    let link = this.regExp.exec(this.paper.citationsLink)[1];
    console.log(link)
  	this.GCPS.find(link)
  		.subscribe(
  			body=> {
  				console.log(body.json())
  				this.something = body.json().data
  			}
  		)

  }

}
