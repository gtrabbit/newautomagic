import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { RankingService } from '../ranking.service';
import { TopCitedService } from '../top-cited.service';


@Component({
  selector: 'app-first-panel',
  templateUrl: './first-panel.component.html',
  styleUrls: ['./first-panel.component.css'],
  providers: [ TopCitedService ]
})
export class FirstPanelComponent implements OnInit {
	
	@Input() public data;
  public panelTitle: string = "Confirm Paper List"
  public included: Article[] = [];
  public paperList: Article[] = [];
  public journalList: string[] = [];
  public displayState: number = 0;
  public totalNumber: number = 0;
  public removed: string[];
  public editShow: boolean[] = [];
  public rankings: any;
  public toggleRankPanel: boolean = false;
  public pbf: Object = {};
  public name: string = "Client";
  @Output() public closing = new EventEmitter();


  public fieldList = ["Agricultural Science", 
    "Biology & Biochemistry",
    "Chemistry",
    "Clinical Medicine",
    "Computer Science",
    "Economics & Business",
    "Engineering",
    "Environment/Ecology",
    "Geosciences",
    "Immunology",
    "Materials Science",
    "Mathematics",
    "Microbiology",
    "Molecular Biology & Genetics",
    "Multidisciplinary",
    "Neuroscience & Behavior",
    "Pharmacology & Toxicology",
    "Physics",
    "Plant & Animal Science",
    "Psychiatry/Psychology",
    "Social Sciences General",
    "Space Science"]


  constructor(private RS: RankingService, private TCS: TopCitedService) { }

  ngOnInit() {
  		for (let item of this.data){
        let paper = new Article(item.title, item.journal, item.citations, item.year, item.exclude);
        this.paperList.push(paper);
      }
      this.removed = [];
        this.TCS.getPBF()
          .subscribe(
          body => this.pbf = body.json()
        ) 
  
  }

  checkDisplayState() {
     switch (this.displayState) {
      case 0:
        this.panelTitle = "Confirm Paper List";
      break;
      case 1:
        this.journalList = [];
        this.included = [];
        this.panelTitle = "Confirm Journal List";
        for (let item of this.paperList){
          if (!item.exclude){
            this.included.push(item);
            }
          }
        this.journalList.push(this.included[0].journal)  
        for (let item in this.included){
          if (this.journalList.every((a) => {
            return this.clean(a) !== this.clean(this.included[item].journal)
          })) {
            this.journalList.push(this.included[item].journal)
          }

        }

        break;

        case 2:

          this.panelTitle = "Retrieve Rankings";
          this.RS.getRanks(this.journalList)
            .subscribe(
              body => this.rankings = body.json(),
              error => console.log(error),
              () => this.toggleRankPanel = true);
        

        break;

        case 3:
          this.panelTitle = "Find Top-cited Articles"

        break;
      
      default:
        // code...
        break;
    }

  

 
  }

  gotoMC(){
    this.displayState = 3;
  }

  jumpBack(){
    this.displayState=0;
  }

  edit(i){
    this.editShow[i] = true;
  }

  close(){
    this.closing.emit(false);
  }

  check(name){
    this.name = name;
   
  }

  submitEdit(i, j){
     this.journalList[i] = j;
     this.editShow[i]=false;
  }

  remove(i){
      this.removed.push(this.journalList.splice(i, 1)[0]);

  }

  clean (a){
   a = a.toLowerCase().replace(/\s(and|&)\s/g, " ").replace(/[^\s\w]/g, " ").replace(/\s+/g, " ").replace(/the/gi, "").trim();
  return (a);
}



  returnItem(i){
    this.journalList.push(this.removed.splice(i, 1)[0]) ;
  }


  next(){
    this.displayState++;
    this.checkDisplayState();
  }

  previous(){
    this.displayState--;
    this.checkDisplayState();
  }


}
