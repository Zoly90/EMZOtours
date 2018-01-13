import { Component, Input, SimpleChanges } from "@angular/core";
import { PersonalizedOffer } from "../../../pages-models/personalized-offer-model";
import { PersonalizedOfferService } from "../../../pages-services/personalized-offer.service";

@Component({
	selector: 'offer-view-modal',
	templateUrl: './offer-view-modal.component.html',
	styleUrls: ['./offer-view-modal.component.scss']
})
export class OfferViewModalComponent {

	@Input() personalizedOfferId: number;

	private personalizedOffer: PersonalizedOffer = new PersonalizedOffer();

	constructor(private _personalizedOfferService: PersonalizedOfferService) { }

	ngOnInit() {
		this._personalizedOfferService.getPersonalizedOffer(this.personalizedOfferId)
			.subscribe(offer => this.personalizedOffer = offer);
	}
}