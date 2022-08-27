import { visitAll } from '@angular/compiler';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CourseGroup, GradeItem, SchoolCourse } from 'src/app/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css', '../../.././years-list.component.css']
})



export class CourseComponent {
  @Input() courseObj!: SchoolCourse; //| undefined
  @Input() isEditing3!: boolean;
  @Output() requestSaveCourse = new EventEmitter<string>();

  items: CourseGroup[] = []; // Appears in the popup window

  ngOnInit(): void {
   this.items = this.courseObj.getGroups();
  }

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

  toggleEdit(){
    this.isEditing3 = !this.isEditing3;
  }

  // request saving whenever data is upated
  requestSaveGroup(content: string){
    this.requestSaveCourse.emit(content);
    
  }

  // GROUPS
  addNewGroup(){
    this.courseObj.addGroup();
    this.requestSaveCourse.emit("Group added");
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
  deleteGroup(id:CourseGroup){
    this.courseObj.deleteGroup(id);
    this.requestSaveCourse.emit("Group deleted");
   }

   // GRADES
   addNewGrade(id:CourseGroup){
    id.addGrade();
    this.requestSaveCourse.emit("Grade added");
   }

   editGrade(id:GradeItem, value:string){
    // remove newlines
    value = value.replace(/\r?\n|\r/g, "").trim();
    // check length then edit year if good
    if(value.length > 0){
      id.editGrade(value);
      this.requestSaveCourse.emit("Grade edited");
    }
  }

  editWeight(id:GradeItem, value:string){
    var v = parseFloat(value);
    if(v>100) v=100;
    if(v<0) v=0;
    id.editWeight(v);
    this.requestSaveCourse.emit("Weight edited");

  }

  editMark(id:GradeItem, value:string){
    var v = parseFloat(value);
    if(v>100) v=100;
    if(v<0) v=0;
    id.editMark(v);
    this.requestSaveCourse.emit("Mark edited");

  }
   
   deleteGrade(parent:CourseGroup, id:GradeItem ){
    parent.deleteGrade(id);
    this.requestSaveCourse.emit("Grade deleted");
   }

   // calculations

  totalWeights(){
      var weight = 0;
      for(let group of this.courseObj.getGroups()){
        for(let grade of group.getGrades()){
          weight += grade.getWeight();
        }
      }
      return weight;
  }

  totalScores(){
    var score = 0;
    for(let group of this.courseObj.getGroups()){
      for(let grade of group.getGrades()){
        score += grade.getMark() * (grade.getWeight()/100);
      }
    }
    return score;
  }

  calculateAverage(){
    return (this.totalScores() / this.totalWeights())*100;
  }




  
}