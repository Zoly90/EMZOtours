import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SignUpModalComponent } from "../signUpModal/signupModal.component";
import { TurismAppConstants } from "../../../utils/constants";
import { Router } from "@angular/router";

@Component({
  selector: 'my-profile-dropdown',
  templateUrl: './my-profile-dropdown.component.html',
  styleUrls: ['./my-profile-dropdown.component.scss']
})
export class MyProfileDropdownComponent {

  public signUpModalRef: BsModalRef;

  private signUpModalAction: string = TurismAppConstants.EDIT_MY_PROFILE;

  constructor(
    private _modalService: BsModalService,
    private _router: Router
  ) { }

  public navigateToAppliedHolidays() {
    this._router.navigate([TurismAppConstants.LOGGED_IN_USER_HOLIDAYS_LIST_VIEW_PAGE_PATH]);
  }

  public navigateToHolidaysWishlist() {
    return
  }

  public openSignUpModal() {
    this.signUpModalRef = this._modalService.show(SignUpModalComponent, { class: 'modal-lg' });
    this.signUpModalRef.content.updateMyProfile = this.signUpModalAction;
  }

}