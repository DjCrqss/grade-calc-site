export class SchoolYear{
    // School year that stores an array of terms (Semester one, Semester two..)
    protected terms: SchoolTerm[] = [];
    public id: number;
    // constructor with ID
    constructor(id: number){
        this.id = id;
    }
    // add a school term
    addTerm(){
        this.terms.push(new SchoolTerm("SWEN221"));
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






