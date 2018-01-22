import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SearchCriteria } from "../../../../shared/models/search-criteria.model";

@Injectable()
export class HolidaysManagementService {

	private _baseURL: string = 'api/turism-app/holiday/management';

	constructor(
		private _http: HttpClient
	) { }

	public getHolidaysBySearchCriteria(searchCriteria: SearchCriteria): Observable<any> {
		return this._http.post(`${this._baseURL}/search`, searchCriteria);
	}
}