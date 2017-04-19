import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ScanService } from '../scan.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css'],
  providers: [ ScanService ]
})
export class ProfileSearchComponent implements OnInit {

  public toggle: Boolean = false;
  public paperList: Article[];
  public journalList: string[];
  public data: Object;







  constructor(private scanService: ScanService) {
  		
   }

  ngOnInit() {
  
  }

  toggleShow(val){
    this.toggle = val;
  }



  scan(website: string){
    this.scanService.getPaperList(website)
    				.subscribe(
    					body => this.data = body.json(),
    					error => console.log(error),
    					() => this.toggleShow(true));
    		
  }


  log(){
  	console.log(this.data);
  }
}
