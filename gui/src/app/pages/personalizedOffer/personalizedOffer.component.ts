import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { Offer } from './offer';
import * as Collections from 'typescript-collections';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-offer',
  templateUrl: './personalizedOffer.component.html',
  styleUrls: ['./personalizedOffer.component.css']
})
export class PersonalizedOfferComponent implements OnInit {
  // List of countries for client adresses and destinations
  backgroundImagePath = "../../assets/images/background/rsz_background.jpg";

  adressCountries = ['Country', 'Norvegia', 'Japan', 'Hungary', 'Brazil', 'Spain', 'Germany'];
  selectedCountryAdress = this.adressCountries[0];
  destinationCountries = ['Country', 'Norvegia', 'Japan', 'Hungary', 'Brazil', 'Spain', 'Germany'];
  selectedDestinationCountry = this.destinationCountries[0];

  // Logic of travel by checkboxes
  travelByOptions = [
    { name: 'personal car', checked: false },
    { name: 'airplane', checked: false },
    { name: 'bus', checked: false }
  ];
  get selectedOptions() {
    return this.travelByOptions
      .filter(opt => opt.checked)
  }
  checkedTravelOptions = new Collections.Set<string>();
  changed = false;
  public toggled(open:boolean, opt:string):void {
    console.log('Checked? ', open, opt);
  }
  buildOptionsSet(optionName:string) {
    for (let opt of this.travelByOptions) {
      if (opt.name === optionName && opt.checked === true) {
        console.log(this.travelByOptions);
        console.log(opt.name, optionName, opt.checked);
        console.log('add ', optionName);
        this.checkedTravelOptions.add(optionName);
      }
      if (opt.name === optionName && opt.checked === false) {
        console.log('altceva', optionName);
        this.checkedTravelOptions.remove(optionName);
      }
    }
  }

  // Logic of contact information input fields
  @ViewChild('contactTelephone')
  _contactTelephone: ElementRef;
  @ViewChild('contactEmail')
  _contactEmail: ElementRef;

  input1: HTMLInputElement;
  input2: HTMLInputElement;
  selectedOption: string;
  contactInfoOptions = ['telephone', 'e-mail', 'either'];

  contactInfoTelephone: string;
  contactInfoEmail: string;

  ngOnInit() {
    this.input1 = <HTMLInputElement>this._contactTelephone.nativeElement;
    this.input2 = <HTMLInputElement>this._contactEmail.nativeElement;
    this.input1.disabled = true;
    this.input2.disabled = true;
  }

  setRequiredFields(option: string) {
    if (option == "telephone") {
      // console.log(option + " tel");
      this.input1.disabled = false;
      this.input2.disabled = true;
    } else if (option == "e-mail") {
      this.input1.disabled = true;
      this.input2.disabled = false;
      // console.log(option + " email");
    } else {
      // console.log(option + " either");
      this.input1.disabled = false;
      this.input2.disabled = false;
    }
  }

  // Slider for max price
  thumbLabel = true;
  max = 10000;
  min = 100;
  step = 10;
  valueSlider = this.min;

  // Date range picker
  public daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any) {
    this.daterange.start = value.start;
    this.daterange.end = value.end;
  }


  model = new Offer(42, '', '', '', '', '', '', '', '', '', '', '', '');
  submitted = false;
  onSubmit() { this.submitted = true; }
  newOffer() {
    this.model = new Offer(42, '', '', '', '', '', '', '', '', '', '', '', '');
  }
  saveToDatabase() {
    console.log("saved");
  }
}
