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
  websiteBody: string;
  errormsg: string = "";

  proxyList = ["http://scholar.hipr.com/", "http://s2.hipr.com/", "https://scholar.google.com/"]







  constructor(private scanService: ScanService) {
  		
   }

  ngOnInit() {
  
  }

  toggleShow(val){
    this.toggle = val;
  }



  scan(website: string, proxy){
//checks to make sure it's valid
   if (website.search(/citations\?.*user=/gi) !== -1){
     //replaces with proxy?
    website = website.replace(/.*(?=citations\?user=)/, proxy);
console.log(website);
    this.errormsg = "";
    this.scanService.getPaperList(website)
            .subscribe(
              body => {
                let response = body.json();
                if (response.hasOwnProperty("err")){
                  this.errormsg = response.err;
                  console.log(response.err)
                } else {
                  this.data = body.json().paperList;
                  this.toggleShow(true);
                  console.log(this.data);
                }
              },
              error => console.log(error),
              );
   } else {
     this.errormsg = "Please enter a valid Google Scholar profile"

   }


 
   
   		
  }


  log(){
  	console.log(this.data);
  }

  scratch(){
    this.data = {};
    this.toggleShow(true)
  }

}
