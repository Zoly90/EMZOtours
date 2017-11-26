import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Holiday } from "../../holiday/models/holiday.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HolidayService {

    private _baseURL: string = 'api/turism-app';

    constructor(
        private _http: HttpClient
    ) { }

    public getHolidaysByType(id): Observable<any> {
        return this._http.get(`${this._baseURL}/holidaysByType/${id}`);
    }

    public getHolidaysByCategory(id): Observable<any> {
        return this._http.get(`${this._baseURL}/holidaysBySubcategory/${id}`);
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