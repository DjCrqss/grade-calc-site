import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService, SchoolYear } from '../courses.service';


@Component({
  selector: 'app-years-list',
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.css']
})

export class YearsListComponent{
  // Retrieve values
  items = this.cs.getYears();
  
  
  constructor(private route: ActivatedRoute, private cs: CoursesService) {
    // console.log("Root contents: " + this.items);
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

  requestSave(content: string){
    this.cs.saveToStorage(content);
  }
}
