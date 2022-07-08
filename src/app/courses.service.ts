import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })


// ROOT ELEMENT THAT STORES THE TREE
export class CoursesService{
    years: SchoolYear[] = [];
    items:[] = [];
    // Constructor
    constructor(){
        console.log("LocalStorage data: ");
        console.log(JSON.parse(localStorage.getItem("yearsList") || '{}'));
        console.log("=============")
        // get local contents
        if(localStorage.getItem("yearsList") === null){
            this.years.push(new SchoolYear('2022', []));
        } else {
            this.items = JSON.parse(localStorage.getItem("yearsList") || '{}');
            for(let curItem of this.items){  // cur item should be a year obj but is a JSON object
                this.years.push(new SchoolYear(curItem['id'], curItem['terms']))
            }
            
        }
    }
    // Adds a new year object
    addYear(){
        this.years.push(new SchoolYear("New year", []));
    }
    // Deletes a selected year
    deleteYear(id:SchoolYear){
        if(this.years.findIndex(x => x === id) >= 0){
            this.years.splice(this.years.findIndex(x => x === id), 1);
        }
    }
    // Getter for years list
    getYears(){ return this.years;}

    // saves to storage
    saveToStorage(content: string){
        localStorage.setItem('yearsList', JSON.stringify(this.years));
        console.log("Data saved with event: " + content);
    }
}

export class SchoolYear{
    // School year that stores an array of terms (Semester one, Semester two..)
    terms: SchoolTerm[] = [];
    id: string;
    // constructor with ID and contents
    constructor(id: string, items:[]){
        this.id = id;
        for(let curItem of items){
            this.terms.push(new SchoolTerm(curItem['id'], curItem['courses']));
        }
    }
    // adds a new term/semester
    addTerm(){
        this.terms.push(new SchoolTerm('New term', []));
    }
    // deletes a selected term
    deleteTerm(id:SchoolTerm){
        if(this.terms.findIndex(x => x === id) >= 0){
            this.terms.splice(this.terms.findIndex(x => x === id), 1);
        }
        console.log('Deleted item');
    }
    // Getter for terms list
    getTerms(){
        return this.terms;
    }
    editYear(value:string){
        this.id = value;
    }

}

export class SchoolTerm{
    // School term (semester) that stores an array of courses (ENGR101, CYBR271..)
    courses: SchoolCourse[] = [];
    id : string;

    constructor(id: string, items:[]){
        this.id = id;
        for(let curItem of items){
            this.courses.push(new SchoolCourse(curItem['id'], curItem['gradeGoal']));
        }
    }

    addCourse(){
        this.courses.push(new SchoolCourse("CYBR171", 90));
    }

    deleteCourse(id:SchoolCourse){
        if(this.courses.findIndex(x => x === id) >= 0){
            this.courses.splice(this.courses.findIndex(x => x === id), 1);
        }
        console.log('Deleted item');
    }

    getCourses(){
        return this.courses;
    }

    editTerm(value: string){
        this.id = value;
    }
    
}

export class SchoolCourse{
    // Spectific course that stores different grade groups (Labs, Assignments, Tests..) and goal grade (90%)
    constructor(
        id: string,
        gradeGoal: number,
    ){}
}

export class CourseGroup{
    // Group that stores grades in it (Assn 1, Assn 2..)
    constructor(
        id: number,
        name: string,
        items: GradeItem[] = [],
    ){}
}

export class GradeItem{
    // Specific grade item that stores userGrade, userPredictedGrade, Weight, userGoalEstimate
    constructor(
        id: number,
        name: string,
        userGrade: number, 
        userPredictedGrade: number,
        weight: number,
        userGoalEstimate: number,
    ){}
}






