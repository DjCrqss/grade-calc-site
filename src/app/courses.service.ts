import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })


// ROOT ELEMENT THAT STORES THE TREE
export class CoursesService{
    years: SchoolYear[] = [];

    // temporary
    constructor(){
        this.years.push(new SchoolYear(2020));
        this.years.push(new SchoolYear(2021));
    }

    addYear(){
        this.years.push(new SchoolYear(2022));
        console.log("Added new item");
    }

    deleteYear(id:number){
        // IMPROVE THIS LATER
        console.log(this.years);
        this.years.reverse();
        if(this.years.findIndex(x => x.id === id) >= 0){
            console.log(this.years.findIndex(x => x.id === id));
            this.years.splice(this.years.findIndex(x => x.id === id), 1);
        }
        this.years.reverse();

        console.log('Deleted item');

    }
    getYears(){ return this.years; }



}

export class SchoolYear{
    // School year that stores an array of terms (Semester one, Semester two..)
    protected terms: SchoolTerm[] = [];
    public id: number;
    // constructor with ID
    constructor(id: number){
        this.id = id;
    }
}

export class SchoolTerm{
    // School term (semester) that stores an array of courses (ENGR101, CYBR271..)
    courses: SchoolCourse[] = [];

    constructor(
        name: string
    ){}
}

export class SchoolCourse{
    // Spectific course that stores different grade groups (Labs, Assignments, Tests..) and goal grade (90%)
    constructor(
        id: number,
        gradeGoal: number,
        name: string,
        groups: CourseGroup[] = [],
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






