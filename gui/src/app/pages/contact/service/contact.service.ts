import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ContactInformation } from "../contact.model.ts/contact.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

	private _baseURL: string = 'api/turism-app/contact';

	constructor(
		private _http: HttpClient
	) { }

	public getContactInformation(): Observable<any> {
		return this._http.get(`${this._baseURL}`)
			.map(res => {
				return res;
			});
	}

	public updateContactInformation(newInfo: ContactInformation): Observable<any> {
		return this._http.post(`${this._baseURL}`, newInfo)
			.map(res => {
				return res;
			});
	}
}