import { Component, Input, OnInit, OnChanges, trigger, state, animate, transition, style } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { HolidayDetailViewService } from "../services/holidayDetailView.service";
import { Holiday } from "../models/holiday.model";

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

    holidayDetails: any;
    index: number = 0;
    subscriptionStateFadeOut: any;
    subscriptionStateFadeIn: any;
    imageChanging: any;
    pauseIcon: boolean = true;
    playIcon: boolean = false;

    currentImage: string;
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
        if (this.index == 8) {
            this.index = -1;
        }
    }

    imageFading: string = 'fadeOut';

    constructor(
        private holidayDetailViewService: HolidayDetailViewService
    ) {
        this.imageChanging = setInterval(this.start, 6000);
    }

    fading() {
        this.subscriptionStateFadeIn = Observable.timer(0, 6000).subscribe(t => { this.imageFading = 'fadeIn' });
        this.subscriptionStateFadeOut = Observable.timer(5000, 6000).subscribe(t => { this.imageFading = 'fadeOut' });
    }

    ngOnInit() {
        this.holiday = this.holidayDetailViewService.getHolidayDetails();
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
        console.log("Applied for offer: ", offer);
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
        this.lat = this.holiday.localization.map.lattitude;
        this.lng = this.holiday.localization.map.longitude;

        this.holiday.localization.map.lattitude = this.lat + 0.0001;
        this.holiday.localization.map.longitude = this.lng + 0.0001;

        this.holiday.localization.map.lattitude = this.lat;
        this.holiday.localization.map.longitude = this.lng;
    }

    changeMapVisility() {
        console.log('before', this.showMap);
        this.showMap = !this.showMap;
        console.log('after', this.showMap);
    }
}