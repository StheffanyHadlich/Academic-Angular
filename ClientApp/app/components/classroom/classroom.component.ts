import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'classroom',
    templateUrl: './classroom.component.html'
})
export class ClassroomComponent {
    public classes: any[];
    public professors: any[];
    public subjects: any[];
    public day:number;
    public classroom:string;
    public vacancies:string;        
    public subjectsId:number;
    public professorsId:number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.http
            .get(this.baseUrl + 'api/subjects')
            .subscribe(result => {
                this.subjects = result.json()as any[];
            }, error => console.error(error));
        
        this.http
            .get(this.baseUrl + 'api/professor/')
            .subscribe(result => {
                this.professors = result.json()as any[];
            }, error => console.error(error));

        this.http
            .get(this.baseUrl + 'api/classroom/')
            .subscribe(result => {
                this.classes = result.json()as any[];
            }, error => console.error(error));
               
    }

    Save() {     
        if(this.subjectsId==null || this.professorsId==null){
            alert("incompleted data");
        }
        else{
            var value = {day:this.day,classroom:this.classroom,vacancies:this.vacancies,
                subjectsId:this.subjectsId, professorId:this.professorsId}
            this.http.post(this.baseUrl + 'api/Classroom',value).subscribe(result => {
                this.classes.push(result.json())});        
            
        } 
    
    }

    Delete(classroom:any){
        this.http.delete(this.baseUrl+'api/classroom/'+classroom.id).subscribe(result => {
            if(result.status === 204){
                let index = this.classes.indexOf(classroom);
                this.classes.splice(index,1);
            }
        })
        
    }

    setSubject(sub:number){
        this.subjectsId=sub;
    }

    setProfessor(prof:number){
        this.professorsId=prof;
    }



}
