import { Component, Input } from "@angular/core";
import { PersonalizedOffer } from "../../../pages-models/personalized-offer-model";

@Component({
	selector: 'offer-view-modal',
	templateUrl: './offer-view-modal.component.html',
	styleUrls: ['./offer-view-modal.component.scss']
})
export class OfferViewModalComponent {

	@Input() personalizedOffer: PersonalizedOffer;

	constructor() { }

	ngOnInit() { }
}