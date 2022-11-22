import { ShowapiService } from './showapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showapidata',
  templateUrl: './showapidata.component.html',
  styleUrls: ['./showapidata.component.css']
})

export class ShowapidataComponent implements OnInit {
  searchText:string;

  entries=[];
  entry:any;
  cardnumber='6511249434386545';
  last4digit=this.cardnumber.slice(-4);
  masknumber=this.last4digit.padStart(this.cardnumber.length,'*');


  constructor(private showapi:ShowapiService) {}

  ngOnInit(): void {
    this.showapi.getEntries().subscribe((response)=>{
      this.entry=response;
      this.entries=this.entry.entries;
      console.log(this.entries);
    });
  }
}
