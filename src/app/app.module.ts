import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YearsListComponent } from './years-list/years-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { YearComponent } from './years-list/year/year.component';
import { TermComponent } from './years-list/year/term/term.component';
import { CourseComponent } from './years-list/year/term/course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    YearsListComponent,
    CourseDetailsComponent,
    YearComponent,
    TermComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: YearsListComponent},
      // {path: 'course/:courseID', component: CourseDetailsComponent} USING SINGLE PAGE LAYOUT FOR NOW
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
