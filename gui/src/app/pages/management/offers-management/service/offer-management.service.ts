import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { SearchCriteria } from "../../../../shared/models/search-criteria.model";
import { PersonalizedOffer } from "../../../pages-models/personalized-offer-model";

@Injectable()
export class PersonalizedOfferManagementService {
	private baseUrl: string = 'api/turism-app/personalized-offer'

	constructor(
		private _http: HttpClient
	) { }

	public getPersonalizedOffers(searchCriteria: SearchCriteria): Observable<any> {
		return this._http.post(`${this.baseUrl}/search`, searchCriteria);
	}

	public applyToUser(applyTo: Object): Observable<PersonalizedOffer> {
		return this._http.post(`${this.baseUrl}/apply`, applyTo)
			.map(res => res);
	}

	public finalizeOffer(offer: PersonalizedOffer): Observable<PersonalizedOffer> {
		return this._http.post(`${this.baseUrl}/finalize`, offer)
			.map(res => res);
	}

	public deleteOffer(id: number) {
		return this._http.delete(`${this.baseUrl}/${id}`);
	}
}