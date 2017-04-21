import { Component, OnInit, Input } from '@angular/core';
import { AddIFLinkServiceService } from '../add-iflink-service.service'


@Component({
  selector: 'app-add-iflink',
  templateUrl: './add-iflink.component.html',
  styleUrls: ['./add-iflink.component.css'],
  providers: [ AddIFLinkServiceService ]
})
export class AddIFLinkComponent implements OnInit {

	submitted: boolean = false;
	@Input() journal;


  constructor(private AddIFL: AddIFLinkServiceService) { }

  ngOnInit() {

  }

  submitIFLink(link){
  
  	this.AddIFL.submitIFL(link, this.journal)
  		.subscribe(
        body => console.log(body));
  	this.submitted = true;

  }



}
