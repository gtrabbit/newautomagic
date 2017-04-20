import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { RankingService } from '../ranking.service';
import { TopCitedService } from '../top-cited.service';


@Component({
  selector: 'app-first-panel',
  templateUrl: './first-panel.component.html',
  styleUrls: ['./first-panel.component.css'],
  providers: [ TopCitedService ]
})
export class FirstPanelComponent implements OnInit, OnChanges {
	
	@Input() public data;
  public included: Article[] = [];
  public paperList: Article[] = [];
  public journalList: string[] = [];
  public displayState: number = 0;
  public totalNumber: number = 0;
  public removed: string[];
  public editShow: boolean[] = [];
  public rankings: Array<any> = [];
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

  ngOnChanges() {
 
  }

  gotoMC(){
    this.displayState = 3;
    console.log(this.displayState);
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
    console.log(name);
    this.name = name;
   
  }



  submitEdit(i, j){
     this.journalList[i] = j;
     this.editShow[i]=false;
  }

  remove(i){
      this.removed.push(this.journalList.splice(i, 1)[0]);

  }

  selectLog(f){
    console.log(f)

  }

  returnItem(i){
    this.journalList.push(this.removed.splice(i, 1)[0]) ;
  }


  next(){
    
    switch (this.displayState) {
      case 0:
        this.included = [];
        for (let item of this.paperList){
          if (!item.exclude){
            this.included.push(item);
            }
          }

        for (let item of this.included){
          this.editShow.push(false);
          if (!this.journalList.includes(item.journal)){
            this.journalList.push(item.journal);
          }
        }

        break;

        case 1:
          this.RS.getRanks(this.journalList)
            .subscribe(
              body => this.rankings = body.json(),
              error => console.log(error),
              () => this.toggleRankPanel = true);

        break;

        case 2:

        break;
      
      default:
        // code...
        break;
    }
   
    this.displayState++;
    console.log(this.displayState)
  }

  previous(){
    this.displayState--;
  }

  log(){
  	console.log(this.paperList);
  }



}