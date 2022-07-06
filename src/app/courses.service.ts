import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SchoolYear } from './classes';
import { SchoolTerm } from './classes';
import { SchoolCourse } from './classes';
import { CourseGroup } from './classes';
import { GradeItem } from './classes';

@Injectable({
    providedIn: 'root'
  })

export class CoursesService{
    years: SchoolYear[] = [];

    constructor(){
        this.years.push(new SchoolYear(2020));
        this.years.push(new SchoolYear(2021));
    }

    addYear(){
        this.years.push(new SchoolYear(2022));
    }

    getYears(){
        return this.years;
    }



}