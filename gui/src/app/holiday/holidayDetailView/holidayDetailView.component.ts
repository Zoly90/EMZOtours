import { Component, Input, OnInit, OnChanges, trigger, state, animate, transition, style } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { HolidayDetailViewService } from "../services/holidayDetailView.service";
import { Holiday } from "../models/holiday.model";
import { AuthorizationService } from "../../core/authentication/services/authorization.service";
import { TurismAppConstants } from "../../utils/constants";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyForOfferModalComponent } from "./apply-for-offer-modal/apply-for-offer-modal.component";
import { UtilsService } from "../../utils/utils.service";

@Component({
    selector: 'sd-detail',
    templateUrl: './holidayDetailView.component.html',
    styleUrls: ['./holidayDetailView.component.scss'],
    providers: [HolidayDetailViewService],
    animations: [
        trigger('visibilityChanged', [
            state('fadeIn', style({ opacity: 1 })),
            state('fadeOut', style({ opacity: 0 })),
            transition('* => *', animate('1s'))
        ])
    ]
})

export class HolidayDetailViewComponent {

    backgroundImagePath = "../../../assets/images/background/rsz_background.jpg";

    holiday: Holiday;
    private token;
    private authorizedToEdit: boolean = false;
    private applyButtonText: string = 'Apply';
    holidayDetails: any;
    index: number = 0;
    subscriptionStateFadeOut: any;
    subscriptionStateFadeIn: any;
    imageChanging: any;
    pauseIcon: boolean = true;
    playIcon: boolean = false;

    currentImage: any;
    photoModalWindowOpened: boolean = false;
    imagePointer: number;

    lat: number;
    lng: number;

    includedInOfferList: string[];
    notIncludedInOfferList: string[];
    showMap = false;

    start = () => {
        this.index++;
        this.currentImage = this.holiday.imageSet[this.index];
        if (this.index == this.holiday.imageSet.length - 1) {
            this.index = -1;
        }
    }

    imageFading: string = 'fadeOut';

    bsModalRef: BsModalRef;

    constructor(
        private holidayDetailViewService: HolidayDetailViewService,
        private authorizationService: AuthorizationService,
        private modalService: BsModalService,
        private utilsService: UtilsService,
        private activatedRoute: ActivatedRoute
    ) {
        this.imageChanging = setInterval(this.start, 6000);
    }

    fading() {
        this.subscriptionStateFadeIn = Observable.timer(0, 6000).subscribe(t => { this.imageFading = 'fadeIn' });
        this.subscriptionStateFadeOut = Observable.timer(5000, 6000).subscribe(t => { this.imageFading = 'fadeOut' });
    }

    ngOnInit() {
        this.token = this.utilsService.checkAuthAndGetToken();
        if (this._checkIfLoggedInUserIsAdminOrEmployee()) {
            this.authorizedToEdit = true;
        }

        this.activatedRoute.params.subscribe(() => {
            this.holiday = this.holidayDetailViewService.setHoliday(this.activatedRoute.snapshot.data['holiday']);
        })

        this.fading();
        this.currentImage = this.holiday.imageSet[this.index];
    }

    clickedPauseIcon() {
        this.pauseIcon = !this.pauseIcon;
        this.playIcon = !this.playIcon;
        this.ngOnDestroy();
    }

    clickedPlayIcon() {
        this.playIcon = !this.playIcon;
        this.pauseIcon = !this.pauseIcon;
        this.imageChanging = setInterval(this.start, 6000);
        this.fading();
    }

    navigate(forward) {
        this.ngOnDestroy();
        this.pauseIcon = false;
        this.playIcon = true;
        var index = this.holidayDetails.images.indexOf(this.currentImage) + (forward ? 1 : -1);
        if (index >= 0 && index < this.holidayDetails.images.length) {
            this.currentImage = this.holidayDetails.images[index];
        }
        if (index == this.holidayDetails.images.length) {
            this.currentImage = this.holidayDetails.images[0];
        }
    }

    ngOnDestroy() {
        clearInterval(this.imageChanging);
        this.subscriptionStateFadeIn.unsubscribe();
        this.subscriptionStateFadeOut.unsubscribe();
    }

    setSelectedImageAsCurrent(newSelectedImage) {
        this.ngOnDestroy();
        this.clickedPauseIcon();
        this.currentImage = newSelectedImage;
    }

    applyForOffer(offer) {
        if (this.authorizationService.isAuthenticated()) {
            if (this.token == null) {
                this.token = this.utilsService.checkAuthAndGetToken();
            }
            this.bsModalRef = this.modalService.show(ApplyForOfferModalComponent);
            this.bsModalRef.content.modalTitle = 'Please enter or verify your credit card data';
            this.bsModalRef.content.offerId = offer.id;
            this.bsModalRef.content.userId = this.token.userID;
        } else {
            this.bsModalRef = this.modalService.show(ApplyForOfferModalComponent, { class: 'modal-sm' });
        }
    }

    openImageModal() {
        var imageModalPointer;
        for (var i = 0; i < this.holidayDetails.images.length; i++) {
            if (this.currentImage === this.holidayDetails.images[i]) {
                imageModalPointer = i;
                break;
            }
        }
        this.photoModalWindowOpened = true;
        this.imagePointer = imageModalPointer;
    }

    cancelImageModal() {
        this.photoModalWindowOpened = false;
    }

    setRatingValues(review) {
        for (let i = 0; i < 5; i++) {
            if (i == review.rating.value - 1) {
                review.rating.ratingValues[i] = true;
            } else {
                review.rating.ratingValues[i] = false;
            }
        }
        review.rating.areSet = true;
    }

    changeCoordinates() {
        this.lat = this.holiday.localization.map.latitude;
        this.lng = this.holiday.localization.map.longitude;

        this.holiday.localization.map.latitude = this.lat + 0.0001;
        this.holiday.localization.map.longitude = this.lng + 0.0001;

        this.holiday.localization.map.latitude = this.lat;
        this.holiday.localization.map.longitude = this.lng;
    }

    changeMapVisility() {
        console.log('before', this.showMap);
        this.showMap = !this.showMap;
        console.log('after', this.showMap);
    }

    private editHotelDescription: boolean = false;
    private editRegionDescription: boolean = false;
    private editHotelFacilities: boolean = false;
    private editRoomFacilities: boolean = false;
    private editOfferAndPeriodsInformation: boolean = false;
    private editPointsOfInterest: boolean = false;
    private poi = { pointOfInterest: '', distance: '' };

    public updateHotelDescription() {
        this.editHotelDescription = !this.editHotelDescription;
    }

    public updateRegionDescription() {
        this.editRegionDescription = !this.editRegionDescription;
    }

    public updateHotelFacilities() {
        this.editHotelFacilities = !this.editHotelFacilities;
    }

    public updateHotelFacilitiesList(newList: any, facility: any) {
        newList = newList.split(',');
        this.holiday.facilities.forEach(item => {
            if (item.facilityCategory === facility.facilityCategory) {
                item.facilitiesList = newList;
            }
        })
    }

    public updateRoomFacilities() {
        this.editRoomFacilities = !this.editRoomFacilities;
    }

    public updateRoomFacilitiesList(newList: any, facility: any) {
        newList = newList.split(',');
        this.holiday.rooms.forEach(item => {
            if (item.roomType === facility.roomType) {
                item.roomFacilities = newList;
            }
        })
    }

    public updateOfferAndPeriodsInformation() {
        this.editOfferAndPeriodsInformation = !this.editOfferAndPeriodsInformation;
        if (this.editOfferAndPeriodsInformation) {
            this.applyButtonText = '';
        } else {
            this.applyButtonText = 'Apply';
        }
    }

    public disableOrEnableOffer(offer: any) {
        this.holiday.offerInformation.periods.forEach(item => {
            if (item.id === offer.id) {
                item.available = !item.available;
            }
        })
    }

    public updateOfferIncludedInformation(newList: any) {
        newList = newList.split(',');
        this.holiday.offerInformation.included = newList;
    }

    public updateOfferNotIncludedInformation(newList: any) {
        newList = newList.split(',');
        this.holiday.offerInformation.notIncluded = newList;
    }

    public updatePointsOfInterest() {
        this.editPointsOfInterest = !this.editPointsOfInterest;
    }

    public editPoi(poi: any) {
        this.holiday.localization.pointsOfInterest.forEach(item => {
            if (item.id === poi.id && !item.isEditable) {
                item.isEditable = !item.isEditable;
            }
        })
    }

    public addToPOIList(pointOfInterest: HTMLInputElement, distance: HTMLInputElement) {
        if (pointOfInterest.value != '' && distance.value != '') {
            this.poi.pointOfInterest = pointOfInterest.value;
            this.poi.distance = distance.value;
            this.holiday.localization.pointsOfInterest.push(this.poi);
            this._reset(pointOfInterest, distance)
        }
    }

    public removeFromPOIList(poi: any) {
        let indexToDelete;
        if (poi.id) {
            indexToDelete = this.holiday.localization.pointsOfInterest.findIndex(item => item.id === poi.id);
        } else {
            indexToDelete = this.holiday.localization.pointsOfInterest.findIndex(item => item.pointOfInterest === poi.pointOfInterest);
        }
        this.holiday.localization.pointsOfInterest.splice(indexToDelete, 1);
    }

    private _checkIfLoggedInUserIsAdminOrEmployee() {
        return (this.token != null && (this.token.role === TurismAppConstants.EMPLOYEE || this.token.role === TurismAppConstants.ADMIN))
    }

    private _reset(pointOfInterest: HTMLInputElement, distance: HTMLInputElement) {
        pointOfInterest.value = null;
        distance.value = null;
    }

    public focus(something) {
        console.log(something)
    }
}