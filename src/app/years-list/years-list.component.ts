import { Component } from '@angular/core';
import { CoursesService, SchoolYear } from '../courses.service';


@Component({
  selector: 'app-years-list',
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.css']
})

export class YearsListComponent{
  // Retrieve values
  items = this.cs.getYears();
  CoursesObj:CoursesService; 
  
  // constructor for original object
  constructor(private cs: CoursesService) {
    // console.log("Root contents: " + this.items);
    this.CoursesObj = cs;
  }

  deleteYear(id:SchoolYear){
    this.cs.deleteYear(id);
    this.requestSave("Year deleted");
  }

  // Add new year
  addNewYear(){
    this.cs.addYear();
    // console.log("Root contents: " + this.items);
    this.requestSave("Year added");
  }

  // Call root to save
  requestSave(content: string){
    this.cs.saveToStorage(content);
  }

  toggleEdit(){
    this.cs.toggleEditing();
  }
}
