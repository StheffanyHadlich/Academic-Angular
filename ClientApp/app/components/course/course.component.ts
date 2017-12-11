import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({selector: 'course', templateUrl: './course.component.html'})
export class CourseComponent {
    public courses : any[];
    public name : string;
    public title: string;

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {
        this.http
            .get(this.baseUrl + 'api/course/')
            .subscribe(result => {
                this.courses = result.json()as any[];
            }, error => console.error(error));
    }

    public Save() {
        var value = {name: this.name, title: this.title};
        this.http
            .post(this.baseUrl + 'api/course/', value)
            .subscribe(result => {
                this
                    .courses
                    .push(result.json())
            });
    }

    public Remove(course:any) {
         this.http.delete(this.baseUrl+'api/course/'+course.id).subscribe(result => {
            if(result.status === 204){
                let index = this.courses.indexOf(course);
                this.courses.splice(index,1);  
            }
});
    }

}
