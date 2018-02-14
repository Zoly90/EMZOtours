import { Component, Input, EventEmitter, Output, SimpleChanges } from "@angular/core";
import { PagedList } from "../../shared/models/paged-list.model";
import { HolidayListModel } from "../../holiday/models/holiday-list.model";
import { HolidayUtilsService } from "../../holiday/services/holiday-utils.service";
import { UserService } from "../services/user.service";

@Component({
	selector: 'holiday-list-element',
	templateUrl: './holiday-list-element.component.html',
	styleUrls: ['./holiday-list-element.component.scss'],
})
export class HolidayListElement {

	@Input() holidaySummary: HolidayListModel;
	@Input() userId: number;

	@Output() onHolidayDetail: EventEmitter<any> = new EventEmitter<any>();

	private earlyBookingImageVisible: boolean;
	private lastMinuteImageVisible: boolean;

	constructor(
		private _holidayUtilsService: HolidayUtilsService,
		private _userService: UserService
	) { }

	ngOnInit() { }

	ngOnChanges(simpleChange: SimpleChanges) {
    if ('holidaySummary' in simpleChange) {
			this.holidaySummary.lastMinuteBeginningDate = new Date(this.holidaySummary.lastMinuteBeginningDate);

			this._checkEarlyBookingImageVisibility(this.holidaySummary.earlyBookingDeadline);
			this._checkLastMinuteImageVisibility(this.holidaySummary.lastMinuteBeginningDate);
    }
  }

	public goToDetailPage() {
		this.onHolidayDetail.emit();
	}

	public udateHolidaysWishlist() {
		this.holidaySummary.favorited = !this.holidaySummary.favorited;
		this._userService.saveHolidayToWishlist(this.userId, this.holidaySummary.id).subscribe();
	}

	private _checkEarlyBookingImageVisibility(earlyBookingDeadline: Date) {
			this.earlyBookingImageVisible = this._holidayUtilsService.checkEarlyBookingImageVisibility(earlyBookingDeadline);
			if (this.earlyBookingImageVisible) {
				this._holidayUtilsService.setUpdatedPrice(this.holidaySummary, this.earlyBookingImageVisible, null);
			}
	}

	private _checkLastMinuteImageVisibility(lastMinuteBeginningDate: Date) {
			this.lastMinuteImageVisible = this._holidayUtilsService.checkLastMinuteImageVisibility(lastMinuteBeginningDate);
			if (this.lastMinuteImageVisible) {
				this._holidayUtilsService.setUpdatedPrice(this.holidaySummary, null, this.lastMinuteImageVisible);
			}
	}
}