import { Component, OnInit } from '@angular/core';
import { RankScraperService } from '../rank-scraper.service';

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.css'],
  providers: [ RankScraperService ]
})
export class ScraperComponent implements OnInit {
  
  confirmation: string = "";


  constructor(private RSS: RankScraperService) { }

  ngOnInit() {
  }

  scrape(){
  	this.RSS.scrape().subscribe(
  		body =>	this.confirmation = body.json().msg,
  		err => console.log(err)
  		)
    }


}
