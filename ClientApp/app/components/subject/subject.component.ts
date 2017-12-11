import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'subject',
    templateUrl: './subject.component.html'
})
export class SubjectComponent {
    public subjects: any[];
    public courses: any[];
    public name:string;
    public workload:number;
    public courseId:number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.http
            .get(this.baseUrl + 'api/subjects')
            .subscribe(result => {
                this.subjects = result.json()as any[];
            }, error => console.error(error));
        
        this.http
            .get(this.baseUrl + 'api/course/')
            .subscribe(result => {
                this.courses = result.json()as any[];
            }, error => console.error(error));
               
    }

    Save() {     
        if(this.courseId==null || this.name==null){
            alert("incompleted data");
        }
        else{
            var value = {name:this.name,workload:this.workload,courseId:this.courseId}
            this.http.post(this.baseUrl + 'api/subjects',value).subscribe(result => {
                this.subjects.push(result.json())});        
            
        } 
    
    }

    Delete(subject:any){
        this.http.delete(this.baseUrl+'api/subjects/'+subject.id).subscribe(result => {
            if(result.status === 204){
                let index = this.subjects.indexOf(subject);
                this.subjects.splice(index,1);
            }
        })
        
    }

    setCourse(course:number){
        this.courseId=course;
    }



}
