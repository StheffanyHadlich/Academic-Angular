import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({selector: 'state', templateUrl: './state.component.html'})
export class StateComponent {
    public forecasts : State[];
    public nameState : string;

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {
        this.http
            .get(this.baseUrl + 'api/state/')
            .subscribe(result => {
                this.forecasts = result.json()as State[];
            }, error => console.error(error));
    }

    public Save() {
        var value = {name: this.nameState};
        this.http
            .post(this.baseUrl + 'api/state/', value)
            .subscribe(result => {
                this
                    .forecasts
                    .push(result.json())
            });
    }

    public Remove(state:State) {
         this.http.delete(this.baseUrl+'api/state'+state.id).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(state);
                this.forecasts.splice(index,1);  
            }
});
    }

}

interface State {
    id: number;
    name : string;
}