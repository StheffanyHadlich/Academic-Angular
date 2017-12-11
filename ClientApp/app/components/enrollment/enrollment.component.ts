import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'enrollment',
    templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent {
    public students: any[];
    public studentId: number;
    public classrooms: any[];
    public classroomId: number;
    public enrollments: any[];
    public dateEnrollment: Date;
    public hour:string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.http
            .get(this.baseUrl + 'api/enrollment')
            .subscribe(result => {
                this.enrollments = result.json()as any[];
            }, error => console.error(error));
        
        this.http
            .get(this.baseUrl + 'api/students')
            .subscribe(result => {
                this.students = result.json()as any[];
            }, error => console.error(error));

        this.http
            .get(this.baseUrl + 'api/class')
            .subscribe(result => {
                this.classrooms = result.json()as any[];
            }, error => console.error(error));
               
    }

    Save() {     
        if(this.classroomId==null || this.studentId==null || this.dateEnrollment==null ){
            alert("incompleted data");
        }
        else{
            var value = {dateEnrollment:this.dateEnrollment,Hour:this.hour,
            studentId:this.studentId,classroomId:this.classroomId}
            this.http.post(this.baseUrl + 'api/Enrollment',value).subscribe(result => {
                this.enrollments.push(result.json())});        
            
        } 
    
    }

    Delete(enrollment:any){
        this.http.delete(this.baseUrl+'api/Enrollment/'+enrollment.id).subscribe(result => {
            if(result.status === 204){
                let index = this.enrollments.indexOf(enrollment);
                this.enrollments.splice(index,1);
            }
        })
        
    }

    setStudent(student:number){
        this.studentId=student;
    }

    setClass(classroom:number){
        this.classroomId=classroom;
    }
    
    

}
