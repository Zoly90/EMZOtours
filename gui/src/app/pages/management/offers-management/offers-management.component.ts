import { Component } from "@angular/core";
import { PersonalizedOfferService } from "../../pages-services/personalized-offer.service";
import { PersonalizedOffer } from "../../pages-models/personalized-offer-model";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../../core/authentication/services/authorization.service";
import { TurismAppConstants } from "../../../utils/constants";
import * as _ from 'lodash';

@Component({
	selector: 'offers-management',
	templateUrl: './offers-management.component.html',
	styleUrls: ['./offers-management.component.scss']
})
export class OffersManagementComponent {

	private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';
	private listOfOffers: Array<PersonalizedOffer>;
	private token;

	constructor(
		private router: Router,
		private personalizedOfferService: PersonalizedOfferService,
		private authorizationService: AuthorizationService
	) { }

	ngOnInit() {
		this.token = this.authorizationService.getDecodedToken();
		if (this.token != null && this.token.role === TurismAppConstants.EMPLOYEE || this.token.role === TurismAppConstants.ADMIN) {
			this.personalizedOfferService.getPersonalizedOffers().subscribe(
				list => {
					this.listOfOffers = list
					this.listOfOffers.forEach(item => item.offerStatus = 'OPEN')
				}
			)
		} else {
			this.router.navigate(['/']);
		}
	}

	public assignToMe(offer) {
		// this.personalizedOfferService.applyToUser({ offerId: offer.id, userId: this.token.userId })
		// 	.subscribe(res => {
		// 		let updatedOfferId = this.listOfOffers.findIndex(item => item.id === offer.id);
		// 		this.listOfOffers[updatedOfferId] = res;
		// 	})
		let updatedOfferId = this.listOfOffers.findIndex(item => item.id === offer.id);
				this.listOfOffers[updatedOfferId].handeledBy = this.token.name;
				this.listOfOffers[updatedOfferId].offerStatus = 'WIP';
	}

	public deleteConfirmed(cofirmation, offer) {
		if (cofirmation) {
			this._deleteOffer(offer);
		}
	}

	private _deleteOffer(offer) {
		this.personalizedOfferService.deleteOffer(offer.id).toPromise()
			.then(res => {
				this.listOfOffers.splice(_.findIndex(
					this.listOfOffers, function (o) {
						return o.id === offer.id;
					}), 1)
			})
			.catch(err => console.log(err));
	}
}