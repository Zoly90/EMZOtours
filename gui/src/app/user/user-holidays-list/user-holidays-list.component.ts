import { Component } from "@angular/core";
import { UtilsService } from "../../utils/utils.service";
import { UserService } from "../../shared/services/user.service";
import { PagedList } from "../../shared/models/paged-list.model";
import { UserHolidayListModel } from "../../shared/models/user-holiday-list.model";
import { HolidayUtilsService } from "../../holiday/services/holiday-utils.service";
import { QueryParameter } from "../../shared/models/shared-models.model";
import { TurismAppConstants } from "../../utils/constants";

@Component({
  selector: 'user-holidays-list',
  templateUrl: './user-holidays-list.component.html',
  styleUrls: ['./user-holidays-list.component.scss']
})
export class UserHolidaysList {

  private holidayList: Array<UserHolidayListModel>;

  constructor(
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _holidayUtilsService: HolidayUtilsService
  ) { }

  ngOnInit() {
    const token = this._utilsService.checkAuthAndGetToken();
    if (token) {
      this._userService.getHolidaysOfLoggedInUser(token.userID).subscribe((backendData: Array<UserHolidayListModel>) => {
        this.holidayList = backendData;
        this.holidayList = this._holidayUtilsService.setNumberOfStarsArray(this.holidayList);
      });
    }
  }

  public goToDetailPage(holiday: UserHolidayListModel) {
    console.log('in component', holiday);
    let queryParamName: string;
    if (holiday.participated) {
      queryParamName = TurismAppConstants.PARTICIPATED;
    } else {
      queryParamName = TurismAppConstants.HIDE_OFFERS_TAB;
    }
    this._holidayUtilsService.goToDetailPage(holiday, queryParamName);
  }
}