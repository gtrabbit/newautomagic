import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Article } from '../article';


@Component({
  selector: 'app-top-cited',
  templateUrl: './top-cited.component.html',
  styleUrls: ['./top-cited.component.css']
})
export class TopCitedComponent implements OnInit, OnChanges {

	@Input() field: string = "";
  @Input() pbf: Object = {};
  @Input() paperList: Article[] = [];
  @Input() name: string = "Client";
  public payLoad: Array<string> = ["'s article, ''", "'' published in ", ", has received <strong>", " citations </strong> to date. For all articles published in the category of ", " in ", ", the average number of citations is only ", ". This article is thus one of the <strong style='text-decoration: underline'> top ", "</strong><strong> most cited articles published in ", " in "];
  public mostCitedList: Array<string>;
  

  constructor() { }

  ngOnInit() {
  	
  
  }

  log(){
  
  }

  ngOnChanges(){
    this.getMostCited();

  }

  getMostCited(){

    const readOut=[];
   
    this.paperList.forEach((a) => {
    
    let targets = this.pbf[this.field].percentiles[a.year];
    let perc;
    for (let item in targets){
      if (Number(a.citations) >= Number(item)){
        perc = targets[item];
      }
    }
    if (perc){
      let k = this.name + this.payLoad[0] + a.title + this.payLoad[1] + a.year + this.payLoad[8] + "<em>" + a.journal + "</em>" + this.payLoad[2] + a.citations  + this.payLoad[3] + this.field + this.payLoad[4] + a.year  + this.payLoad[5] + this.pbf[this.field].averages[a.year] + this.payLoad[6] +  perc +  this.payLoad[7] + this.field + this.payLoad[8] + a.year + "</strong>.";
      readOut.push(k);
      }

    })
    
    this.mostCitedList = readOut;

    
  }
 

}
