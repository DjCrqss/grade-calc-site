import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';


@Component({
  selector: 'app-years-list',
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.css']
})

export class YearsListComponent{
  // Retrieve values
  items = this.cs.getYears();
  
  constructor(private route: ActivatedRoute, private cs: CoursesService) {
  }

  deleteYear(id:number){
    this.cs.deleteYear(id);
  }

  // Add new year
  addNewYear(){
    this.cs.addYear();
  }
}
