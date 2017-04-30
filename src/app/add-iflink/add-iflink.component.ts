import { Component, OnInit, Input } from '@angular/core';
import { AddIFLinkServiceService } from '../add-iflink-service.service'


@Component({
  selector: 'app-add-iflink',
  templateUrl: './add-iflink.component.html',
  styleUrls: ['./add-iflink.component.css'],
  providers: [ AddIFLinkServiceService ]
})
export class AddIFLinkComponent implements OnInit {

  search: string;
	submitted: boolean = false;
	@Input() journal;


  constructor(private AddIFL: AddIFLinkServiceService) { }



    //creates URL for Google search for IF
  ngOnInit() {
    if (this.journal){
      this.search = this.journal.journalName.concat(" impact factor").split(" ").join("+");
      this.search = "https://www.google.com/search?q=" + this.search;

    }
   

  }
    //submits link to DL PDF to be attached to entry in DB
  submitIFLink(link){
  	this.AddIFL.submitIFL(link, this.journal)
  		.subscribe(
        body => console.log(body));
  	this.submitted = true;

  }



}
