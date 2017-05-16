import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Holiday } from "../models/holiday.model";

@Injectable()
export class HolidayService {
    private baseUrl: string = 'api/turism-app'

    constructor(
        private _http: Http
    ) { }

    public getHolidaysByType(id): Observable<Holiday> {
        return this._http.get(`${this.baseUrl}/holidaysByType/${id}`)
            .map(res => res.json())
    }

    public getHolidaysByCategory(id): Observable<Holiday> {
        return this._http.get(`${this.baseUrl}/holidaysBySubcategory/${id}`)
            .map(res => res.json())
    }

}