import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as Collections from 'typescript-collections';
import { PersonalizedOffer, DepartureCountries, DestinationCountries, TravelByOptions, ContactInformationOptions } from "../pages-models/personalized-offer-model";
import { PersonalizedOfferService } from "../pages-services/personalized-offer.service";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'personalized-offer',
  templateUrl: './personalizedOffer.component.html',
  styleUrls: ['./personalizedOffer.component.scss']
})
export class PersonalizedOfferComponent implements OnInit {
  
  private backgroundImagePath = '../../assets/images/background/rsz_background.jpg';

  private adressCountries;
  private destinationCountries;
  private travelByOptions;
  private contactInfoOptions;
  private personalizedOffer: PersonalizedOffer;

  private submitted: boolean = false;
  private emailNotValid: boolean;
  private telephoneNrNotValid: boolean;
  private children: boolean = false;
  private pets: boolean = false;

  private emailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private checkedTravelOptions = new Collections.Set<string>();

  // Logic of contact information input fields
  @ViewChild('contactTelephone')
  _contactTelephone: ElementRef;
  @ViewChild('contactEmail')
  _contactEmail: ElementRef;

  private input1: HTMLInputElement;
  private input2: HTMLInputElement;
  private selectedOption: string;

  constructor(
    private personalizedOfferService: PersonalizedOfferService
  ) {}

  ngOnInit() {
    this.input1 = <HTMLInputElement>this._contactTelephone.nativeElement;
    this.input2 = <HTMLInputElement>this._contactEmail.nativeElement;
    this.input1.disabled = true;
    this.input2.disabled = true;

    this.personalizedOffer = new PersonalizedOffer();
    this.adressCountries = new DepartureCountries().departureCountries;
    this.contactInfoOptions = new ContactInformationOptions().contactInfoOptions;
    this.destinationCountries = new DestinationCountries().destinationCountries;
    this.travelByOptions = new TravelByOptions().travelByOptions;

    this.personalizedOffer.travelDestination = null;
    this.personalizedOffer.departureCountry = null;
  }

  // Logic of travel by checkboxes
  get selectedOptions() {
    return this.travelByOptions
      .filter(opt => opt.checked)
  }

  buildOptionsSet(optionName: string) {
    for (let opt of this.travelByOptions) {
      if (opt.name === optionName && opt.checked === true) {
        this.checkedTravelOptions.add(optionName);
      }
      if (opt.name === optionName && opt.checked === false) {
        this.checkedTravelOptions.remove(optionName);
      }
    }
  }

  setRequiredFieldsContactInfo(option: string) {
    if (option == "telephone") {
      this.input1.disabled = false;
      this.input2.disabled = true;
    } else if (option == "e-mail") {
      this.input1.disabled = true;
      this.input2.disabled = false;
    } else {
      this.input1.disabled = false;
      this.input2.disabled = false;
    }
  }

  // Slider for max price
  private thumbLabel = true;
  // private max = 10000;
  // private min = 100;
  private step = 10;
  private valueSlider = 100;

  // Date range picker
  private daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  private options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  private selectedDate(value: any) {
    this.personalizedOffer.firstDayOfHoliday = value.start.toDate();
    this.personalizedOffer.lastDayOfHoliday = value.end.toDate();
  }

  private checkTelephoneNr(value) {
    if (value.length == 0) {
      return
    } else if (!Number(value) || value.length < 10) {
      this.telephoneNrNotValid = true;
    } else {
      this.telephoneNrNotValid = false;
    }
  }

  private checkEmailWithRegex(value) {
    if (value.length == 0) {
      return
    } else {
      this.emailNotValid = !this.emailRegexPattern.test(value);
    }
  }

  private onSubmit() {
    this.submitted = true;
  }

  private newOffer() {
    this.valueSlider = 100;
    this.personalizedOffer = new PersonalizedOffer();
  }

  private beforeSubmit() {
    this.personalizedOffer.travelBy = '';
    this.checkedTravelOptions.toArray().forEach((option: string, index: number) => {
      if (index + 1 < this.checkedTravelOptions.toArray().length) {
        this.personalizedOffer.travelBy += option + ', ';
      } else {
        this.personalizedOffer.travelBy += option;
      }
    });
    this.onSubmit();
  }

  private saveToDatabase() {    
    this.personalizedOfferService.savePersonalizedOffer(this.personalizedOffer).subscribe();
    console.log(this.personalizedOffer);
    this.submitted = false;
    this.newOffer();
  }

  // changed = false;
  // public toggled(open: boolean, opt: string): void {
  //   console.log('Checked? ', open, opt);
  // }
}
