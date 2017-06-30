import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Holiday } from "../../holiday/models/holiday.model";

@Injectable()
export class HolidayService {
    private baseUrl: string = 'api/turism-app'

    constructor(
        private _http: Http
    ) { }

    public getHolidaysByType(id): Observable<any> {
        return this._http.get(`${this.baseUrl}/holidaysByType/${id}`)
            .map(res => {
                return res.json();
            })
    }



    public getHolidaysByCategory(id): Observable<any> {
        return this._http.get(`${this.baseUrl}/holidaysBySubcategory/${id}`)
            .map(res => {
                return res.json();
            })
    }

}