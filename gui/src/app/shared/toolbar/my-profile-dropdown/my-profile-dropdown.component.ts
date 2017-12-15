import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SignUpModalComponent } from "../signUpModal/signupModal.component";
import { TurismAppConstants } from "../../../utils/constants";

@Component({
  selector: 'my-profile-dropdown',
  templateUrl: './my-profile-dropdown.component.html',
  styleUrls: ['./my-profile-dropdown.component.scss']
})
export class MyProfileDropdownComponent {

  // @Output() onLoginSuccessful = new EventEmitter();

  public signUpModalRef: BsModalRef;

  private signUpModalAction: string = TurismAppConstants.EDIT_MY_PROFILE;

  constructor(
    private _modalService: BsModalService
  ) { }

  public openSignUpModal(action: string) {
    this.signUpModalRef = this._modalService.show(SignUpModalComponent, { class: 'modal-lg' });
    this.signUpModalRef.content.updateMyProfile = this.signUpModalAction;
  }

}