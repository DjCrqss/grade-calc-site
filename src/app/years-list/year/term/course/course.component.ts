import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CourseGroup, SchoolCourse, GradeItem } from 'src/app/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css', '../../.././years-list.component.css']
})



export class CourseComponent {
  @Input() courseObj!: SchoolCourse; //| undefined
  @Output() requestSaveCourse = new EventEmitter<string>();

  items: CourseGroup[] = []; // Appears in the popup window

  ngOnInit(): void {
   this.items = this.courseObj.getGroups();
  }

  // Course modification
  editCourse(id:string){
    // remove newlines
    id = id.replace(/\r?\n|\r/g, "").trim();
    // check length then edit year if good
    if(id.length > 0){
      this.courseObj.editCourse(id);
      this.requestSaveCourse.emit("Edited course");
    }
   }

   editGoal(value:string){
    value = value.replace(/\r?\n|\r/g, "").trim();
    if(!isNaN(Number(value))){
      let goalNum:number = Number(value);
      if(goalNum >= 0 && goalNum <= 100){
        this.courseObj.editGoal(goalNum);
        this.requestSaveCourse.emit("Edited goal");
      }
    }
  }

  // Course groups modifications
  addNewGroup(){
    this.courseObj.addGroup();
    this.requestSaveCourse.emit("Group added");
   }


  deleteGroup(id:CourseGroup){
   this.courseObj.deleteGroup(id);
   this.requestSaveCourse.emit("Group deleted");
  }

  editGroup(id:CourseGroup, value:string){
    // remove newlines
    value = value.replace(/\r?\n|\r/g, "").trim();
    // check length then edit year if good
    if(value.length > 0){
      this.courseObj.editGroup(id, value);
      this.requestSaveCourse.emit("Group edited");
    }
  }


  // Course grade modifications
  addNewGrade(parent:CourseGroup){
    this.courseObj.addGrade(parent);
    this.requestSaveCourse.emit("Grade added");
  }

  deleteGrade(parent:CourseGroup, id:GradeItem){
    parent.deleteGrade(id);
    this.requestSaveCourse.emit("Grade deleted");
  }



  requestSaveGroup(content: string){
    this.requestSaveCourse.emit(content);
  }
}