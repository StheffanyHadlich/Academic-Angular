import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { StudentComponent } from './components/student/student.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { CourseComponent } from './components/course/course.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        StateComponent,
        CityComponent,
        StudentComponent,
        ProfessorComponent,
        CourseComponent,
        SubjectComponent,
        ClassroomComponent,
        EnrollmentComponent

    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'state', component: StateComponent },
            { path: 'city', component: CityComponent },
            { path: 'student', component: StudentComponent },
            { path: 'professor', component: ProfessorComponent },
            { path: 'course', component: CourseComponent },
            { path: 'subject', component: SubjectComponent },
            { path: 'class', component: ClassroomComponent },
            { path: 'enrollment', component: EnrollmentComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
