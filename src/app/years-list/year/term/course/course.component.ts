import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CourseGroup, SchoolCourse } from 'src/app/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css', '../../.././years-list.component.css']
})



export class CourseComponent {
  @Input() courseObj!: SchoolCourse; //| undefined
  @Output() requestSaveCourse = new EventEmitter<string>();

  items: CourseGroup[] = [];


  openCourse(){
    console.log('click');
  }

 ngOnInit(): void {
   // console.log(this.yearObj);
   this.items = this.courseObj.getGroups();
   // console.log("Year contents: " + this.items);
  //  this.requestSaveCourse.emit("TESTINg");
   
 }

 deleteGroup(id:CourseGroup){
   this.courseObj.deleteGroup(id);
   this.requestSaveCourse.emit("Group deleted");
 }

 // Add new year
 addNewGroup(){
   this.courseObj.addGroup();
   this.requestSaveCourse.emit("Group added");
 }
 
 editCourse(id:string){
   // remove newlines
   id.replace(/\r?\n|\r/g, "").trim();
   // check length then edit year if good
   if(id.length > 0){
     this.courseObj.editCourse(id);
     this.requestSaveCourse.emit("Edited course");
   }
 }

 requestSaveGroup(content: string){
  this.requestSaveCourse.emit(content);
}
}