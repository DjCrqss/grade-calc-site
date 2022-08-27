import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})


// ROOT ELEMENT THAT STORES THE TREE
export class CoursesService{
    years: SchoolYear[] = [];
    items:[] = [];
    isEditing:boolean = false;
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
    // Toggles deleting all elements
    toggleEditing(){
        this.isEditing ? this.isEditing = false : this.isEditing = true;
    }
}

export class SchoolYear{
    // School year that stores an array of terms (Semester one, Semester two..)
    id: string;
    terms: SchoolTerm[] = [];
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
    }
    // Getter for terms list
    getTerms(){
        return this.terms;
    }
    // edit year name
    editYear(value:string){
        this.id = value;
    }

}

export class SchoolTerm{
    // School term (semester) that stores an array of courses (ENGR101, CYBR271..)
    id : string;
    courses: SchoolCourse[] = [];
    // Constructor with ID and contents
    constructor(id: string, items:[]){
        this.id = id;
        for(let curItem of items){
            this.courses.push(new SchoolCourse(curItem['id'], curItem['gradeGoal'], curItem['isOpen'] , curItem['groups']));
        }
    }
    //  adds a new course
    addCourse(){
        let course = new SchoolCourse("New course", 0, false, [])
        course.addDefault();
        this.courses.push(course);
    }
    //  deletes a selected course
    deleteCourse(id:SchoolCourse){
        if(this.courses.findIndex(x => x === id) >= 0){
            this.courses.splice(this.courses.findIndex(x => x === id), 1);
        }
    }
    //  Getter for courses list
    getCourses(){
        return this.courses;
    }
    // edit term name
    editTerm(value: string){
        this.id = value;
    }
    
}

export class SchoolCourse{
    // Spectific course that stores different grade groups (Labs, Assignments, Tests..) and goal grade (90%)
    id: string;
    groups: CourseGroup[] = [];
    gradeGoal: number;
    needsName: boolean = false;
    isOpen: boolean;
    // constructor with ID and contents
    constructor(id: string, gradeGoal: number, isOpen: boolean, items:[]){
        this.id = id;
        this.isOpen = isOpen;
        this.gradeGoal = gradeGoal;
        this.needsName = this.id == "New course" ? true : false;
        for(let curItem of items){
            this.groups.push(new CourseGroup(curItem['id'], curItem['grades']));
        }
    }

    addDefault(){
        this.gradeGoal = 90;
        this.groups.push(new CourseGroup("Assignments", []));
        this.groups.push(new CourseGroup("Exams", []));
    }

    // edit course name
    editCourse(value: string){
        this.id = value;
        this.needsName = this.id == "New course" ? true : false;
    }

    editGoal(value: number){
        this.gradeGoal = value;
    }

    // toggle open status
    toggleOpen(){
        this.isOpen = !this.isOpen;
    }


    // GROUPS
    // Add course group
    addGroup(){
        this.groups.push(new CourseGroup("New group", []));
    }
    // Delete specific course group
    deleteGroup(id:CourseGroup){
        if(this.groups.findIndex(x => x === id) >= 0){
            this.groups.splice(this.groups.findIndex(x => x === id), 1);
        }
        console.log('Deleted group');
    }
    // return course groups
    getGroups(){
        return this.groups;
    }
    editGroup(id:CourseGroup, value:string){
        // find group with specific name
        if(this.groups.findIndex(x => x === id) >= 0){
            this.groups[this.groups.findIndex(x => x === id)].editGroup(value);
        }
    }


    // GRADES
    addGrade(groupID:CourseGroup){
        if(this.groups.findIndex(x => x === groupID) >= 0){
            this.groups[this.groups.findIndex(x => x === groupID)].addGrade();
        }
    }

}


export class CourseGroup{
    // Group that stores grades in it (Assn 1, Assn 2..)
    id: string;
    grades: GradeItem[] = [];
    // Constructor
    constructor( id: string, items:[]){
        this.id = id;
        for(let curItem of items){
            this.grades.push(new GradeItem(curItem['id'], curItem['userGrade'], curItem['weight'], curItem['estimatedGrade'],  curItem['isGradePredicted']));
        }
    }
    // Add grade item
    addGrade(){
        this.grades.push(new GradeItem("New grade", 0, 0, 0, false));
    }
    // Delete specific grade
    deleteGrade(id:GradeItem){
        if(this.grades.findIndex(x => x === id) >= 0){
            this.grades.splice(this.grades.findIndex(x => x === id), 1);
        }
        console.log('Deleted grade');
    }
    // return course groups
    getGrades(){
        return this.grades;
    }
    // edit course name (self)
    editGroup(value: string){
        this.id = value;
    }


}

export class GradeItem{
    id: string;
    userGrade: number;
    weight: number;
    estimatedGrade: number;
    isGradePredicted: boolean;

    //Specific grade item that stores userGrade, userPredictedGrade, Weight, userGoalEstimate
    constructor(
        id: string,
        userGrade: number, 
        weight: number,
        estimatedGrade: number,
        isGradePredicted: boolean
    ){
        this.id = id;
        this.userGrade = userGrade;
        this.weight = weight;   
        this.estimatedGrade = estimatedGrade;
        this.isGradePredicted = isGradePredicted;
    }

    editGrade(value:string){
        this.id = value;
    }

    editMark(value:number){
        this.userGrade = value;
    }

    editWeight(value:number){
        this.weight = value;
    }

    getWeight(){
        return this.weight;
    }

    getMark(){
        return this.userGrade;
    }

}






