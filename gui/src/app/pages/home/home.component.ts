import {
  Component, OnChanges, Input, ViewChild, ElementRef, ChangeDetectorRef, Renderer2,
} from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Category } from "../../core/models/category.model";
import { CategoriesAndTypesService } from "../../core/services/categories-types.service";
import { Router } from "@angular/router";
import { TurismAppConstants } from "../../utils/constants";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { SharedServices } from "../../shared/services/shared-services.service";
import { FilterCriteria, SearchCriteria, FilterFileds, FilterFiledsName } from "../../shared/models/search-criteria.model";
import { PagedList } from "../../shared/models/paged-list.model";
import { HolidayService } from "../../holiday/services/holiday.service";
import { HolidayListModel } from "../../holiday/models/holiday-list.model";
import { UtilsService } from "../../utils/utils.service";
import { HolidayUtilsService } from "../../holiday/services/holiday-utils.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('1s'))
    ])
  ]
})
export class HomeComponent {

  @ViewChild('nrOfDaysContainer') nrOfDaysContainer: ElementRef;
  @ViewChild('nrOfDaysDropdown') nrOfDaysDropdown: ElementRef;
  @ViewChild('daysInput') daysInput: ElementRef;
  @ViewChild('countriesContainer') countriesContainer: ElementRef;
  @ViewChild('countriesDropdown') countriesDropdownRef: ElementRef;
  @ViewChild('edp', { read: ElementRef }) endDate: ElementRef;
  @ViewChild('edp') datePickerRef;

  private holidaySearchForm: FormGroup;
  private searchCriteria: SearchCriteria = new SearchCriteria();
  private paginationConfig = {
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0
  }

  private listOfHolidays: Array<any>;

  categories: Category[] = [];

  newId: number;
  prevId: number;

  private numberOfDaysDropdown: boolean = false;
  private numberOfDaysArray = [7, 10, 14]

  private countriesDropdown: boolean = false;
  private listOfCountries: Array<any>;
  private bsConfig: Partial<BsDatepickerConfig>;

  private bsValue: Date = new Date();
  private beginMinDate = new Date();
  private beginMaxDate = new Date(this.beginMinDate.getFullYear() + 1, this.beginMinDate.getMonth(), this.beginMinDate.getDate());
  private endMinDate;
  private endMaxDate;

  constructor(
    private _router: Router,
    private _categoriesAndTypesService: CategoriesAndTypesService,
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private _sharedServices: SharedServices,
    private _holidayService: HolidayService,
    private _utilsService: UtilsService,
    private _holidayUtilsService: HolidayUtilsService
  ) {
    this.holidaySearchForm = this._formBuilder.group({
      destinationCountryFilter: [
        {
          value: '',
          disabled: false
        }
      ],
      beginDateFilter: [
        {
          value: '',
          disabled: false
        }
      ],
      endDateFilter: [
        {
          value: '',
          disabled: true
        }
      ],
      numberOfPeopleFilter: [
        {
          value: '',
          disabled: false
        }
      ],
      numberOfDaysFilter: [
        {
          value: '',
          disabled: false
        }
      ]
    });

    document.addEventListener('click', this._closeDropdownOnOffClickHandler.bind(this));
  }

  ngOnInit() {
    this._categoriesAndTypesService.$categories.subscribe(data => {
      this.categories = data;
    });

    this._sharedServices.getAllCountries().subscribe(list => {
      this.listOfCountries = list;
    });

    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });

    this.holidaySearchForm.controls['beginDateFilter'].valueChanges.subscribe((value: Date) => {
      if (value) {
        this.holidaySearchForm.controls['endDateFilter'].enable();
        this.endDate.nativeElement.removeAttribute('disabled');
        this.endMinDate = new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1);
        this.endMaxDate = new Date(this.endMinDate.getFullYear() + 1, this.endMinDate.getMonth(), this.endMinDate.getDate());
        setTimeout(() => {
          this.datePickerRef.toggle();
        }, 0);
      } else {
        this.holidaySearchForm.controls['endDateFilter'].disable();
      }
    });

    this.holidaySearchForm.controls['numberOfDaysFilter'].valueChanges.subscribe(value => {
      this.daysInput.nativeElement.value = value + ' days';
    });
  }

  public searchForHolidays(formValues) {
    this.searchCriteria.paginationCriteria.itemsPerPage = this.paginationConfig.itemsPerPage;
    this.searchCriteria.paginationCriteria.offset = this.paginationConfig.itemsPerPage * this.paginationConfig.currentPage;
    this.searchCriteria.filterCriteria = new Array<FilterCriteria>();
    Object.keys(this.holidaySearchForm.controls).forEach(key => {
      if (key === String(FilterFileds[FilterFileds.destinationCountryFilter]) && this.holidaySearchForm.controls[key].value) {
        this.searchCriteria.filterCriteria.push(
          new FilterCriteria(FilterFiledsName.get(String(FilterFileds.destinationCountryFilter)), this.holidaySearchForm.controls[key].value));
      }
      if (key === String(FilterFileds[FilterFileds.beginDateFilter]) && this.holidaySearchForm.controls[key].value) {
        this.searchCriteria.filterCriteria.push(
          new FilterCriteria(FilterFiledsName.get(String(FilterFileds.beginDateFilter)), new Date(this.holidaySearchForm.controls[key].value).getMilliseconds()));
      }
      if (key === String(FilterFileds[FilterFileds.endDateFilter]) && this.holidaySearchForm.controls[key].value) {
        this.searchCriteria.filterCriteria.push(
          new FilterCriteria(FilterFiledsName.get(String(FilterFileds.endDateFilter)), new Date(this.holidaySearchForm.controls[key].value).getMilliseconds()));
      }
      if (key === String(FilterFileds[FilterFileds.numberOfPeopleFilter]) && this.holidaySearchForm.controls[key].value) {
        this.searchCriteria.filterCriteria.push(
          new FilterCriteria(FilterFiledsName.get(String(FilterFileds.numberOfPeopleFilter)), this.holidaySearchForm.controls[key].value));
      }
      if (key === String(FilterFileds[FilterFileds.numberOfDaysFilter]) && this.holidaySearchForm.controls[key].value) {
        this.searchCriteria.filterCriteria.push(
          new FilterCriteria(FilterFiledsName.get(String(FilterFileds.numberOfDaysFilter)), this.holidaySearchForm.controls[key].value));
      }
    });
    if (this.searchCriteria.filterCriteria.length) {
      this._getHolidaysBySearchCriteria();
    }
  }

  public toggleNumberOfDaysDropdown() {
    this.numberOfDaysDropdown = !this.numberOfDaysDropdown;
  }

  public toggleCountriesDropdown() {
    this.countriesDropdown = !this.countriesDropdown;
  }

  public increaseNumberOfPeople() {
    if (this.holidaySearchForm.controls['numberOfPeopleFilter'].value) {
      this.holidaySearchForm.controls['numberOfPeopleFilter'].setValue(Number(this.holidaySearchForm.controls['numberOfPeopleFilter'].value) + 1);
    } else {
      this.holidaySearchForm.controls['numberOfPeopleFilter'].setValue(1);
    }
  }

  public decreaseNumberOfPeople() {
    if (this.holidaySearchForm.controls['numberOfPeopleFilter'].value && this.holidaySearchForm.controls['numberOfPeopleFilter'].value != 0) {
      this.holidaySearchForm.controls['numberOfPeopleFilter'].setValue(Number(this.holidaySearchForm.controls['numberOfPeopleFilter'].value) - 1);
    } else {
      return
    }
  }

  public setDestinationValueInFormGroup(country: string) {
    this.holidaySearchForm.controls['destinationCountryFilter'].setValue(country);
    this.toggleCountriesDropdown();
  }

  public setNumberOfNightsValueInFormGroup(number: number) {
    this.holidaySearchForm.controls['numberOfDaysFilter'].setValue(number);
    this.toggleNumberOfDaysDropdown();
  }

  public onPageChange(page) {
    this.paginationConfig.currentPage = page;
  }

  private _getHolidaysBySearchCriteria() {
    this._holidayService.getHolidaysBySearchCriteria(this.searchCriteria, 'quickFilter').subscribe((paginatedData: PagedList<HolidayListModel>) => {
      this.listOfHolidays = paginatedData.data;
      this.listOfHolidays = this._holidayUtilsService.setNumberOfStarsArray(this.listOfHolidays);
      this.paginationConfig.totalItems = paginatedData.itemsTotal;
    })
  }

  private _closeDropdownOnOffClickHandler(event: any) {
    if (!this.nrOfDaysContainer.nativeElement.contains(event.target) && (this.nrOfDaysDropdown && !this.nrOfDaysDropdown.nativeElement.contains(event.target))) {
      this.numberOfDaysDropdown = false;
    }
    if (!this.countriesContainer.nativeElement.contains(event.target) && (this.countriesDropdownRef && !this.countriesDropdownRef.nativeElement.contains(event.target))) {
      this.countriesDropdown = false;
    }
  }

  public activateOpacityAndFading(id) {
    this.newId = id;
    if (this.newId !== this.prevId) {
      for (let category of this.categories) {
        if (this.newId === category.id) {
          category.imageOpacity = true;
          category.toggleFading = true;
          category.visibility = category.toggleFading ? 'shown' : 'hidden';
          category.subcategoriesHidden = false;
        }
        if (this.prevId === category.id) {
          category.imageOpacity = false;
          category.toggleFading = false;
          category.visibility = category.toggleFading ? 'shown' : 'hidden';
          category.subcategoriesHidden = true;
        }
      }
      this.prevId = this.newId;
    }
  }

  public goToListPage(currentCategory): void {
    let categoryId: number;

    for (let category of this.categories) {
      for (let subcategory of category.holidaySubcategories)
        if (subcategory.subcategory === currentCategory) {
          categoryId = subcategory.id;
        }
    }

    this._router.navigate([TurismAppConstants.HOLIDAY_LIST_VIEW_PAGE_PATH + '/' + currentCategory],
      { queryParams: { category: currentCategory, id: categoryId } });
  }

  public goToDetailPage(holiday: HolidayListModel) {
    this._holidayUtilsService.goToDetailPage(holiday);
  }
}