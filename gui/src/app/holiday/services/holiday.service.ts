import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Holiday } from "../../holiday/models/holiday.model";
import { HttpClient } from "@angular/common/http";
import { SearchCriteria } from "../../shared/models/search-criteria.model";

@Injectable()
export class HolidayService {

    private _baseURL: string = 'api/turism-app';

    constructor(
        private _http: HttpClient
    ) { }

    public getHolidaysBySearchCriteria(searchCriteria: SearchCriteria, quickFilter?: string): Observable<any>  {
        return this._http.post(`${this._baseURL}/holiday/search`, searchCriteria, 
        {
            params: {
                'quickFilter': quickFilter ? quickFilter : ''
            }
        });
    }

    public getAllHolidays(): Observable<any> {
        return this._http.get(`${this._baseURL}/holidays`);
    }

    public getHolidayById(id: number): Observable<any> {
        return this._http.get(`${this._baseURL}/holiday/${id}`);
    }

    public deleteHoliday(id: number) {
        return this._http.delete(`${this._baseURL}/holiday/${id}`);
    }
}