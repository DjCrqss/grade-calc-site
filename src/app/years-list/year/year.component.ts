import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolYear } from '../../courses.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent {
  @Input() yearObj: SchoolYear | undefined;
   // Modify values
   
  

  // Menu
  toggleMenu(){
    
  }

}
