import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { PersonalizedOffer } from "../pages-models/personalized-offer-model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PersonalizedOfferService {
    private baseUrl: string = 'api/turism-app/personalized-offer'

    constructor(
        private _http: HttpClient
    ) { }

    public getPersonalizedOffers(): Observable<any> {
        return this._http.get(`${this.baseUrl}`)
            .map(res => res);
    }

    public getPersonalizedOffer(id: number): Observable<PersonalizedOffer> {
        return this._http.get(`${this.baseUrl}/${id}`)
            .map(res => res);
    }

    public savePersonalizedOffer(newPersonalizedOffer: PersonalizedOffer): Observable<PersonalizedOffer> {
        return this._http.post(`${this.baseUrl}`, newPersonalizedOffer)
            .map(res => res);
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