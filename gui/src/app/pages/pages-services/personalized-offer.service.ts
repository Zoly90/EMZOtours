import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { PersonalizedOffer } from "../pages-models/personalized-offer-model";
import { HttpClient } from "@angular/common/http";
import { SearchCriteria } from "../../shared/models/search-criteria.model";

@Injectable()
export class PersonalizedOfferService {
    private baseUrl: string = 'api/turism-app/personalized-offer'

    constructor(
        private _http: HttpClient
    ) { }

    public getPersonalizedOffer(id: number): Observable<PersonalizedOffer> {
        return this._http.get(`${this.baseUrl}/${id}`)
            .map(res => res);
    }

    public savePersonalizedOffer(newPersonalizedOffer: PersonalizedOffer): Observable<PersonalizedOffer> {
        return this._http.post(`${this.baseUrl}`, newPersonalizedOffer)
            .map(res => res);
    }
}