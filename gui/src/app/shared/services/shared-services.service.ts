import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { SearchCriteria } from "../../shared/models/search-criteria.model";

@Injectable()
export class SharedServices {
    private baseUrl: string = 'api/turism-app'

    constructor(
        private _http: HttpClient
    ) { }

    public getAllCountries(): Observable<any> {
        return this._http.get(`${this.baseUrl}/countries`);
    }

    public getAllCities(): Observable<any> {
        return this._http.get(`${this.baseUrl}/cities`);
    }
}