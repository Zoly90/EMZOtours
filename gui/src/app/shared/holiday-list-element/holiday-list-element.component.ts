import { Component, Input, EventEmitter, Output } from "@angular/core";
import { PagedList } from "../../shared/models/paged-list.model";
import { HolidayListModel } from "../../holiday/models/holiday-list.model";

@Component({
	selector: 'holiday-list-element',
	templateUrl: './holiday-list-element.component.html',
	styleUrls: ['./holiday-list-element.component.scss'],
})
export class HolidayListElement {

	@Input() holidaySummary: HolidayListModel;

	@Output() onHolidayDetail: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }

	public goToDetailPage() {
		this.onHolidayDetail.emit();
	}
}