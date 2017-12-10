import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: StateForecast[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/State').subscribe(result => {
            this.forecasts = result.json() as StateForecast[];
        }, error => console.error(error));
    }
}

interface StateForecast {
    name: string;
}
