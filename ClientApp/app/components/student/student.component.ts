import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({selector: 'student', templateUrl: './student.component.html'})
export class StudentComponent {
    public students : any[];
    public cities : any[];
    public nameStudent : string;
    public address: string;
    public email: string;
    public telephone: string;
    public nameCity: number;

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {
        this
            .http
            .get(this.baseUrl + 'api/student')
            .subscribe(result => {
                this.students = result.json()as any[];
            }, error => console.error(error));

        this
            .http
            .get(this.baseUrl + 'api/city')
            .subscribe(result => {
                this.cities = result.json()as any[];
            }, error => console.error(error));

    }

    public Save() {
        if(this.nameCity==null || this.nameStudent==null){
            alert("incompleted data");
        }
        else{
            var value = {name:this.nameStudent,address:this.address,email:this.email,
                telephone:this.telephone, stateId:this.nameCity}
            this.http.post(this.baseUrl + 'api/Student/',value).subscribe(result => {
                this.cities.push(result.json())});        
            
        } 
    }

    public Remove(student : any) {
        this
            .http
            .delete(this.baseUrl + 'api/student/' + student.id)
            .subscribe(result => {
                if (result.status === 204) {
                    let index = this.students.indexOf(student);
                    this.students.splice(index, 1);
                }
            });
    }

    
    setCity(city:number){
        this.nameCity=city;
    }


}
