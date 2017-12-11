import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'city',
    templateUrl: './city.component.html'
})
export class CityComponent {
    public states: State[];
    public cities: City[];
    public nameCity:string;
    public nameState:number;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.http
            .get(this.baseUrl + 'api/state')
            .subscribe(result => {
                this.states = result.json()as State[];
            }, error => console.error(error));
        
        this.http
            .get(this.baseUrl + 'api/city')
            .subscribe(result => {
                this.cities = result.json()as City[];
            }, error => console.error(error));
               
    }

    Save() {     
        if(this.nameState==null || this.nameCity==null){
            alert("incompleted data");
        }
        else{
            var value = {name:this.nameCity,stateId:this.nameState}
            this.http.post(this.baseUrl + 'api/City',value).subscribe(result => {
                this.cities.push(result.json())});        
            
        } 
    
    }

    Delete(city:City){
        this.http.delete(this.baseUrl+'api/City/'+city.id).subscribe(result => {
            if(result.status === 204){
                let index = this.cities.indexOf(city);
                this.cities.splice(index,1);
            }
        })
        
    }

    setState(state:number){
        this.nameState=state;
    }



}

interface City {
    id : number;
    name : string;
    estado: State;
    estadoId:number;
}

interface State {
    id : number;
    name : string;
}