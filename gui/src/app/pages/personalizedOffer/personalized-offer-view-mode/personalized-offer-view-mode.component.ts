import { Component, OnInit, Input } from "@angular/core";
import { PersonalizedOffer } from "../../pages-models/personalized-offer-model";

@Component({
	selector: 'personalized-offer-view-mode',
	templateUrl: './personalized-offer-view-mode.component.html',
	styleUrls: ['./personalized-offer-view-mode.component.scss']
})
export class PersonalizedOfferViewModeComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	@Input() personalizedOffer: PersonalizedOffer;
}