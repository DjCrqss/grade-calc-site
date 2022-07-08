import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SchoolCourse, SchoolTerm } from 'src/app/courses.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css', '../.././years-list.component.css']
})


export class TermComponent {
  @Input() termObj!: SchoolTerm; //| undefined
  @Output() requestSave = new EventEmitter<string>();
  

  items: SchoolCourse[] = [];


 ngOnInit(): void {
   // console.log(this.yearObj);
   this.items = this.termObj.getCourses();
   // console.log("Year contents: " + this.items);
 }

 deleteCourse(id:SchoolCourse){
   this.termObj.deleteCourse(id);
   this.requestSave.emit("Course deleted");
 }

 // Add new year
 addNewCourse(){
   this.termObj.addCourse();
   this.requestSave.emit("Course added");
 }
 
 editTerm(id:string){
   // remove newlines
   id.replace(/\r?\n|\r/g, "");
   // check length then edit year if good
   if(id.length > 0){
     this.termObj.editTerm(id);
     this.requestSave.emit("Edited term");
   }
 }
}