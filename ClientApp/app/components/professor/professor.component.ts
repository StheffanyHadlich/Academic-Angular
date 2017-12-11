import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({selector: 'professor', templateUrl: './professor.component.html'})
export class ProfessorComponent {
    public professors : any[];
    public name : string;

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {
        this.http
            .get(this.baseUrl + 'api/professor/')
            .subscribe(result => {
                this.professors = result.json()as any[];
            }, error => console.error(error));
    }

    public Save() {
        var value = {name: this.name};
        this.http
            .post(this.baseUrl + 'api/professor/', value)
            .subscribe(result => {
                this
                    .professors
                    .push(result.json())
            });
    }

    public Remove(prof:any) {
         this.http.delete(this.baseUrl+'api/professor/'+prof.id).subscribe(result => {
            if(result.status === 204){
                let index = this.professors.indexOf(prof);
                this.professors.splice(index,1);  
            }
});
    }

}
