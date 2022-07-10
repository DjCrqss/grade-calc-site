import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SchoolYear, SchoolTerm } from '../../courses.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css', '.././years-list.component.css']
})

export class YearComponent {
   @Input() yearObj!: SchoolYear; //| undefined
   @Input() isEditing!: boolean;
   @Output() requestSaveYear = new EventEmitter<string>();
   
   items: SchoolTerm[] = [];

  ngOnInit(): void {
    // console.log(this.yearObj);
    this.items = this.yearObj.getTerms();
    // console.log("Year contents: " + this.items);
  }

  deleteTerm(id:SchoolTerm){
    this.yearObj.deleteTerm(id);
    this.requestSaveYear.emit("Term deleted");
  }

  // Add new year
  addNewTerm(){
    this.yearObj.addTerm();
    this.requestSaveYear.emit("Term added");
  }
  
  // edit year
  editYear(id:string){
    // remove newlines
    id.replace(/\r?\n|\r/g, "");
    // check length then edit year if good
    if(id.length > 0){
      this.yearObj.editYear(id);
      this.requestSaveYear.emit("Edited year");

    }
  }

  // call root component to save when itself or children are modified
  requestSaveTerm(content: string){
    this.requestSaveYear.emit(content);
  }
}
