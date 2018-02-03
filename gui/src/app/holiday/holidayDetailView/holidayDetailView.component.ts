import { Component, Input, OnInit, OnChanges, trigger, state, animate, transition, style, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { HolidayUtilsService } from "../services/holidayDetailView.service";
import { Holiday } from "../models/holiday.model";
import { AuthorizationService } from "../../core/authentication/services/authorization.service";
import { TurismAppConstants } from "../../utils/constants";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyForOfferModalComponent } from "./apply-for-offer-modal/apply-for-offer-modal.component";
import { UtilsService } from "../../utils/utils.service";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryAction } from "ngx-gallery/ngx-gallery-action.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: 'sd-detail',
    templateUrl: './holidayDetailView.component.html',
    styleUrls: ['./holidayDetailView.component.scss'],
    providers: [HolidayUtilsService],
    animations: [
        trigger('visibilityChanged', [
            state('fadeIn', style({ opacity: 1 })),
            state('fadeOut', style({ opacity: 0 })),
            transition('* => *', animate('1s'))
        ])
    ]
})

export class HolidayDetailViewComponent {

    private holiday: Holiday;

    private galleryOptions: NgxGalleryOptions[];
    private galleryImages: Array<NgxGalleryImage> = new Array<NgxGalleryImage>();

    private imageViewModalRef: BsModalRef;
    private paymentModalRef: BsModalRef;

    private token;
    private authorizedToEdit: boolean = false;
    private applyButtonText: string = 'Apply';

    private index: number = 0;
    private currentImage: any;
    private subscriptionStateFadeOut: any;
    private subscriptionStateFadeIn: any;
    private imageChanging: any;
    private startingStatusOfImageFading: string = 'fadeOut';
    private pauseIcon: boolean = true;
    private playIcon: boolean = false;

    private urlCache = new Map<string, SafeResourceUrl>();

    private earlyBookingImageVisible: boolean;
    private lastMinuteImageVisible: boolean;

    showMap = false;

    constructor(
        private _holidayUtilsService: HolidayUtilsService,
        private authorizationService: AuthorizationService,
        private modalService: BsModalService,
        private utilsService: UtilsService,
        private activatedRoute: ActivatedRoute,
        public domSanitizer: DomSanitizer
    ) {
        this.imageChanging = setInterval(this._start, 6000);
    }

    ngOnInit() {
        this.token = this.utilsService.checkAuthAndGetToken();
        if (this._checkIfLoggedInUserIsAdminOrEmployee()) {
            this.changeAuthorizedToEditStatus();
        }

        this.activatedRoute.params.subscribe(() => {
            this.holiday = this._holidayUtilsService.setHoliday(this.activatedRoute.snapshot.data['holiday']);
            this.holiday.lastMinuteBeginningDate = new Date(this.holiday.lastMinuteBeginningDate);

            this._checkEarlyBookingImageVisibility(this.holiday.earlyBookingDeadline);
            this._checkLastMinuteImageVisibility(this.holiday.lastMinuteBeginningDate);

            this.holiday.imageSet.forEach(image => {
                this.galleryImages.push({
                    small: image.image,
                    medium: image.image,
                    big: image.image
                });
            });
        });

        this._fading();
        this._setCurrentImage(this.index);

        this.galleryOptions = [
            { image: false, thumbnails: false, width: '0px', height: '0px' },
            { breakpoint: 500, width: '300px', height: '300px', thumbnailsColumns: 3 },
            { breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 },
        ];
    }

    ngOnDestroy() {
        clearInterval(this.imageChanging);
        this.subscriptionStateFadeIn.unsubscribe();
        this.subscriptionStateFadeOut.unsubscribe();
    }

    public getIframeYouTubeUrl(videoId: string): SafeResourceUrl {
        let url = this.urlCache.get(videoId);
        if (!url) {
            url = this.domSanitizer.bypassSecurityTrustResourceUrl(TurismAppConstants.YOU_TUBE_URL_FIRST_PART + videoId);
            this.urlCache.set(videoId, url);
        }
        return url;
    }

    public clickedPauseIcon() {
        this._updatePlayAndPauseIcons();
        this.ngOnDestroy();
    }

    public clickedPlayIcon() {
        this._updatePlayAndPauseIcons();
        this.imageChanging = setInterval(this._start, 6000);
        this._fading();
    }

    private _updatePlayAndPauseIcons() {
        this.playIcon = !this.playIcon;
        this.pauseIcon = !this.pauseIcon;
    }

    public clickedNavigationIcon(forward) {
        this.ngOnDestroy();
        if (!this.playIcon) {
            this._updatePlayAndPauseIcons();
        }
        let index = this.holiday.imageSet.indexOf(this.currentImage) + (forward ? 1 : -1);
        if (index >= 0 && index < this.holiday.imageSet.length) {
            this._setCurrentImage(index);
        }
        if (index == this.holiday.imageSet.length) {
            this._setCurrentImage(0);
        }
        this.index = index;
    }

    public setSelectedImageAsCurrent(newSelectedImage) {
        this.ngOnDestroy();
        this.currentImage = newSelectedImage;
        this.index = this.holiday.imageSet.indexOf(this.currentImage);
        if (!this.playIcon) {
            this._updatePlayAndPauseIcons();
        }
    }

    applyForOffer(offer) {
        if (this.authorizationService.isAuthenticated()) {
            if (this.token == null) {
                this.token = this.utilsService.checkAuthAndGetToken();
            }
            this.paymentModalRef = this.modalService.show(ApplyForOfferModalComponent);
            this.paymentModalRef.content.modalTitle = 'Please enter or verify your credit card data';
            this.paymentModalRef.content.offerId = offer.id;
            this.paymentModalRef.content.userId = this.token.userID;
        } else {
            this.paymentModalRef = this.modalService.show(ApplyForOfferModalComponent, { class: 'modal-sm' });
        }
    }

    changeMapVisility() {
        console.log('before', this.showMap);
        this.showMap = !this.showMap;
        console.log('after', this.showMap);
    }

    public changeAuthorizedToEditStatus() {
        this.authorizedToEdit = !this.authorizedToEdit;
    }

    private _setCurrentImage(index) {
        this.currentImage = this.holiday.imageSet[index];
    }

    private _fading() {
        this.subscriptionStateFadeIn = Observable.timer(0, 6000).subscribe(t => { this.startingStatusOfImageFading = 'fadeIn' });
        this.subscriptionStateFadeOut = Observable.timer(5000, 6000).subscribe(t => { this.startingStatusOfImageFading = 'fadeOut' });
    }

    private _start = () => {
        this.index++;
        this._setCurrentImage(this.index);
        if (this.index == this.holiday.imageSet.length - 1) {
            this.index = -1;
        }
    }

    private _checkEarlyBookingImageVisibility(earlyBookingDeadline: Date) {
        this.earlyBookingImageVisible = this._holidayUtilsService.checkEarlyBookingImageVisibility(earlyBookingDeadline);
        if (this.earlyBookingImageVisible) {
            this._holidayUtilsService.setUpdatedPrice(this.holiday, this.earlyBookingImageVisible, null);
        }
    }

    private _checkLastMinuteImageVisibility(lastMinuteBeginningDate: Date) {
        this.lastMinuteImageVisible = this._holidayUtilsService.checkLastMinuteImageVisibility(lastMinuteBeginningDate);
        if (this.lastMinuteImageVisible) {
            this._holidayUtilsService.setUpdatedPrice(this.holiday, null, this.lastMinuteImageVisible);
        }
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
        this.holiday.periods.forEach(item => {
            if (item.id === offer.id) {
                item.available = !item.available;
            }
        })
    }

    public updateOfferIncludedInformation(newList: any) {
        newList = newList.split(',');
        this.holiday.included = newList;
    }

    public updateOfferNotIncludedInformation(newList: any) {
        newList = newList.split(',');
        this.holiday.notIncluded = newList;
    }

    public updatePointsOfInterest() {
        this.editPointsOfInterest = !this.editPointsOfInterest;
    }

    public editPoi(poi: any) {
        this.holiday.pointsOfInterest.forEach(item => {
            if (item.id === poi.id && !item.isEditable) {
                item.isEditable = !item.isEditable;
            }
        })
    }

    public addToPOIList(pointOfInterest: HTMLInputElement, distance: HTMLInputElement) {
        if (pointOfInterest.value != '' && distance.value != '') {
            this.poi.pointOfInterest = pointOfInterest.value;
            this.poi.distance = distance.value;
            this.holiday.pointsOfInterest.push(this.poi);
            this._reset(pointOfInterest, distance)
        }
    }

    public removeFromPOIList(poi: any) {
        let indexToDelete;
        if (poi.id) {
            indexToDelete = this.holiday.pointsOfInterest.findIndex(item => item.id === poi.id);
        } else {
            indexToDelete = this.holiday.pointsOfInterest.findIndex(item => item.pointOfInterest === poi.pointOfInterest);
        }
        this.holiday.pointsOfInterest.splice(indexToDelete, 1);
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