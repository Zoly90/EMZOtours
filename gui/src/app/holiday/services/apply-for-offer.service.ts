import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { ApplyForOffer } from "../models/apply-for-offer.model";
import { UtilsService } from "../../utils/utils.service";

@Injectable()
export class ApplyForOfferService {
	private baseURL: string = 'api/turism-app';

	constructor(
		private _http: HttpClient
	) { }

	public applyForOffer(applyForOffer: ApplyForOffer) {
		return this._http.post(`${this.baseURL}/apply-for-offer/${applyForOffer.offerId}/${applyForOffer.userId}`, applyForOffer,
			{
				responseType: 'text'
			});
	}

	public getExistingDataForLoggedInUser(userID: number) {
		return this._http.get(`${this.baseURL}/apply-for-offer/${userID}`)
			.map(res => {
				return res;
			});
	}
}