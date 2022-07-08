import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolYear, SchoolTerm } from '../../courses.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css', '.././years-list.component.css']
})

export class YearComponent {
   @Input() yearObj!: SchoolYear; //| undefined
   @Output() requestSave = new EventEmitter<string>();
   

   items: SchoolTerm[] = [];


  ngOnInit(): void {
    // console.log(this.yearObj);
    this.items = this.yearObj.getTerms();
    // console.log("Year contents: " + this.items);
  }

  deleteTerm(id:SchoolTerm){
    this.yearObj.deleteTerm(id);
    this.requestSave.emit("Term deleted");
  }

  // Add new year
  addNewTerm(){
    this.yearObj.addTerm();
    this.requestSave.emit("Term added");
  }
  
  editYear(){

    this.yearObj.editYear(2022);
    this.requestSave.emit("Edited year");
  }

  // Menu
  toggleMenu(){
    
  }

}
