import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'city',
    templateUrl: './city.component.html'
})
export class CityComponent {
    public forecasts: StateForecast[];
    public nameState:string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
       this.List();  
               
    }

    List(){
        this.http.get(this.baseUrl + 'api/City').subscribe(result => {
            this.forecasts = result.json() as StateForecast[];
        }, error => console.error(error));
    }

    Save() {      
        var value = {name:this.nameState};
        this.http.post(this.baseUrl + 'api/City',value).subscribe(error => console.error(error));        
        this.List();
    }


    Delete(){
        
    }



}

interface StateForecast {
    name: string;
    state: number;
}